import {indexedDB} from './indexedDB';

export default function useIndexedDB() {
  const db = new indexedDB();

  const createDatabase = async databaseName => {
    const request = db.open(databaseName);

    // request.onerror = await function(event) {

    // };
    // request.onsuccess = await function(event) {

    // };

    return {
      success: (request.onsuccess = await function(event) {
        return event;
      }),
      error: (request.onsuccess = await function(event) {
        return event;
      }),
    };
  };

  return {createDatabase};
}
