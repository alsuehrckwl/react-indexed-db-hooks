import React from 'react';
import {TRANSACTION_MODE} from './constants';
import {checkDatabase} from './utils';
import {IndexedDBContext, IndexedDBStateValue} from './indexedDBProvider';

export function useIndexedDB() {
  const [state] = IndexedDBStateValue(IndexedDBContext);

  const createDatabase = () => {
    const request = indexedDB.open(state.databaseName);

    return new Promise((resolve, reject) => {
      request.onsuccess = event => {
        if (event.type === 'success') {
          resolve(event.target.result);
        }
      };
      request.onerror = event => {
        reject(`IndexedDB create error : ${request.error}`);
      };
    });
  };

  const openDatabase = (version = 1) => {
    const request = state.indexedDB.open(state.databaseName);

    return new Promise((resolve, reject) => {
      request.onsuccess = event => {
        resolve({result: request.result, event: event});
      };
      request.onerror = event => {
        reject(`IndexedDB open error: ${request.error}`);
      };
    });
  };

  const createSchema = (metas, version) => {
    return new Promise((resolve, reject) => {
      const request = state.indexedDB.open(state.databaseName, version);

      request.onsuccess = event => {
        resolve(event.target.result);
      };
      request.onerror = event => {
        reject(`IndexedDB open error: ${request.error}`);
      };

      request.onupgradeneeded = event => {
        const db = event.target.result;

        metas.forEach(meta => {
          if (!db.objectStoreNames.contains(meta.schema)) {
            const objectStore = db.createObjectStore(
              meta.schema,
              meta.autoIncrement,
            );

            meta.indexes.forEach(index => {
              objectStore.createIndex(index.name, index.keypath, index.options);
            });
          }
        });
      };
    });
  };

  const transactions = {
    insert: (schema, data) => {
      return new Promise((resolve, reject) => {
        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readwrite)
          .objectStore(schema);
        const request = transaction.add(data);

        request.onsuccess = event => {
          resolve(true);
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    findById: (schema, id) => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const request = transaction.get(+id);

        request.onsuccess = event => {
          if (event.target.result === undefined) {
            reject(`${schema} id ${id} is undefined`);
          } else {
            resolve(event.target.result);
          }
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    findByKey: (schema, index, value) => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const transactionIndex = transaction.index(index);
        const request = transactionIndex.getKey(value);

        request.onsuccess = event => {
          if (event.target.result === undefined) {
            reject(`${schema} index: ${index} - ${value} is undefined`);
          } else {
            resolve(event.target.result);
          }
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    findByValue: (schema, index, value) => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const transactionIndex = transaction.index(index);
        const request = transactionIndex.get(value);

        request.onsuccess = event => {
          if (event.target.result === undefined) {
            reject(`${schema} index: ${index} - ${value} is undefined`);
          } else {
            resolve(event.target.result);
          }
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    findAll: schema => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const request = transaction.getAll();

        request.onsuccess = event => {
          resolve(event.target.result);
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    findAllKeys: schema => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const request = transaction.getAllKeys();

        request.onsuccess = event => {
          resolve(event.target.result);
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    count: schema => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readonly)
          .objectStore(schema);
        const request = transaction.count();

        request.onsuccess = event => {
          resolve(event.target.result);
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    update: (schema, data) => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readwrite)
          .objectStore(schema)
          .put(data);

        transaction.onsuccess = event => {
          resolve(event.target.result);
        };

        transaction.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    deleteByKey: (schema, index, value) => {
      return new Promise((resolve, reject) => {
        const validation = checkDatabase(state.db, schema);

        if (validation.check) {
          reject(validation.msg);
        }

        const transaction = state.db
          .transaction(schema, TRANSACTION_MODE.readwrite)
          .objectStore(schema);
        const transactionIndex = transaction.index(index);
        const request = transactionIndex.getKey(value);

        request.onsuccess = event => {
          const key = event.target.result;

          if (key === undefined) {
            reject(`${schema} index: ${index} - ${value} is undefined`);
            return;
          }

          const deleteRequest = transaction.delete(key);

          deleteRequest.onsuccess = event => {
            resolve(true);
          };

          deleteRequest.onerror = event => {
            reject(event.target.error);
          };
        };

        request.onerror = event => {
          reject(event.target.error);
        };
      });
    },
    clear: () => {},
    openCursor: () => {},
  };

  return {openDatabase, createSchema, ...transactions};
}
