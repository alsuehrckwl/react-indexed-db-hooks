export function indexedDB() {
  return typeof window !== 'undefined' && window || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}
