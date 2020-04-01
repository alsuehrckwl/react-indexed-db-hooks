import {indexedDB} from './indexedDB';
import {TRANSACTION_MODE} from './constants';
import {checkDatabase} from './utils';

export function useIndexedDB() {
  const database = new indexedDB();

  const createDatabase = databaseName => {
    const request = database.open(databaseName);

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

  const openDatabase = (databaseName, version = 1) => {
    const request = database.open(databaseName);

    return new Promise((resolve, reject) => {
      request.onsuccess = event => {
        resolve({result: request.result, event: event});
      };
      request.onerror = event => {
        reject(`IndexedDB open error: ${request.error}`);
      };
    });
  };

  const createSchema = (databaseName, metas) => {
    const request = openDatabase(databaseName);

    request.then(success => {
      success.result.close();

      const newVersion = database.open(
        databaseName,
        success.result.version + 1,
      );

      newVersion.onupgradeneeded = event => {
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

      newVersion.onsuccess = event => {
        const db = event.target.result;
        db.close();
      };

      newVersion.onerror = event => {
        const db = event.target.result;
        db.close();
      };
    });
  };

  const transactions = {
    insert: (databaseName, schema, data) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readwrite)
            .objectStore(schema);
          const request = transaction.add(data);

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    findById: (databaseName, schema, id) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const request = transaction.get(+id);

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    findByKey: (databaseName, schema, index, value) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const transactionIndex = transaction.index(index);
          const request = transactionIndex.getKey(value);

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    findByValue: (databaseName, schema, index, value) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const transactionIndex = transaction.index(index);
          const request = transactionIndex.get(value);

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    findAll: (databaseName, schema) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const request = transaction.getAll();

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    findAllKeys: (databaseName, schema) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const request = transaction.getAllKeys();

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    count: (databaseName, schema) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readonly)
            .objectStore(schema);
          const request = transaction.count();

          request.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    update: (databaseName, schema, data) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readwrite)
            .objectStore(schema)
            .put(data);

          transaction.onsuccess = event => {
            resolve(event.target.result);
            db.close();
          };

          transaction.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    deleteByKey: (databaseName, schema, index, value) => {
      return new Promise((resolve, reject) => {
        openDatabase(databaseName).then(success => {
          const db = success.result;
          const validation = checkDatabase(db, schema);

          if (validation.check) {
            reject(validation.msg);
          }

          const transaction = db
            .transaction(schema, TRANSACTION_MODE.readwrite)
            .objectStore(schema);
          const transactionIndex = transaction.index(index);
          const request = transactionIndex.getKey(value);

          request.onsuccess = event => {
            const key = event.target.result;
            const deleteRequest = transaction.delete(key);

            deleteRequest.onsuccess = event => {
              resolve(event.target.result);
              db.close();
            };

            deleteRequest.onerror = event => {
              reject(event.target.error);
              db.close();
            };
          };

          request.onerror = event => {
            reject(event.target.error);
            db.close();
          };
        });
      });
    },
    clear: () => {},
    openCursor: () => {},
  };

  return {createDatabase, openDatabase, createSchema, ...transactions};
}
