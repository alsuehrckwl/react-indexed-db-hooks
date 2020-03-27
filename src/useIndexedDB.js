import {indexedDB} from './indexedDB';

export default function useIndexedDB() {
  const db = new indexedDB();

  const createDatabase = databaseName => {
    const request = db.open(databaseName);

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
    const request = db.open(databaseName, version);

    return new Promise((resolve, reject) => {
      request.onsuccess = event => {
        resolve(request.result);
      };
      request.onerror = event => {
        reject(`IndexedDB open error: ${request.error}`);
      };
    });
  };

  const createSchema = (databaseName, version = 1, schema) => {
    const request = db.open(databaseName, version);

    console.log(request);

    request.onupgradeneeded = event => {
      console.log(event);
    };
    // openDatabase(databaseName, version).then(res => {
    //   res.onupgradeneeded = event => {
    //     console.log(event)
    //   };
    //   // return res
    // });
  };

  return {createDatabase, openDatabase, createSchema};
}
