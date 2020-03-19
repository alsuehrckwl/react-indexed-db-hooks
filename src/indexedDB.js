export function indexedDB() {
  const db =
    (typeof window !== 'undefined' && window && window.indexedDB) ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  if (!db) {
    window.alert(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
    );
  } else {
    return db;
  }
}
