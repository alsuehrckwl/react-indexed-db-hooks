import {indexedDB} from './indexedDB';

export default function useIndexedDB() {
  const db = new indexedDB();

  const createDatabase = databaseName => {
    const request = db.open(databaseName);

    return {
      success: () => {
        request.onsuccess = function(event) {
          console.log(event);
          return event;
        };
      },
      error: () => {
        request.onerror = async function(event) {
          return await event;
        };
      },
    };
  };

  return {createDatabase};
}
