import {indexedDB} from './indexedDB';
import useIndexedDB from './useIndexedDB';
import '@babel/polyfill';

// count: ƒ count()
// openCursor: ƒ openCursor()
// openKeyCursor: ƒ openKeyCursor()
// index: ƒ index()
// createIndex: ƒ createIndex()
// deleteIndex: ƒ deleteIndex()

const {
  createDatabase,
  openDatabase,
  createSchema,
  insert,
  findById,
  findByKey,
  findByValue,
  findAll,
  findAllKeys,
  count,
} = useIndexedDB();

// openDatabase('picksmatch').then(res => console.log(res)).catch(e => console.log(e))
// createSchema('picksmatch2', [
//   {
//     schema: 'soccerFavorite',
//     autoIncrement: {keyPath: 'gameId', autoIncrement: false},
//     indexes: [
//       // {name: 'gameId', keypath: 'gameId', options: {unique: true}},
//       {name: 'date', keypath: 'date', options: {unique: false}},
//     ],
//   },
// ]);

// insert('picksmatch', 'soccerFavorite2', {gameId: 1123025, date: new Date()})
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ',error));

// findById('picksmatch', 'soccerFavorite', 1)
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ',error));

// findByKey('picksmatch', 'soccerFavorite', 'gameId', 1123023)
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ',error));

findByValue('picksmatch', 'soccerFavorite', 'gameId', 1123023)
  .then(success => console.log(success))
  .catch(error => console.log('error = ', error));

// findAll('picksmatch', 'soccerFavorite')
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ',error));

// findAllKeys('picksmatch', 'soccerFavorite')
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ', error));

// count('picksmatch', 'soccerFavorite')
//   .then(success => console.log(success))
//   .catch(error => console.log('error = ', error));
