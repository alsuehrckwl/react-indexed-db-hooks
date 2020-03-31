import {indexedDB} from './indexedDB';

export default function useIndexedDB() {
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

  const transactions = databaseName => {};

  return {createDatabase, openDatabase, createSchema};
}
