export function checkDatabase(database, schema) {
  let result = {check: false, msg: ''};

  if (!database) {
    result = {check: true, msg: 'Open the indexedDB first and run it again.'};
  }

  if (!database.objectStoreNames.contains(schema)) {
    result = {check: true, msg: `objectStore ${schema} does not exists.`};
  }

  return result;
}
