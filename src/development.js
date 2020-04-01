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
  update,
  deleteByKey,
} = useIndexedDB();

// openDatabase('db')
//   .then(success => alert('database open success !'))
//   .catch(e => alert('db does not exit..'))

// createSchema('db', [
//   {
//     schema: 'user',
//     autoIncrement: {keyPath: 'id', autoIncrement: true},
//     indexes: [
//       {name: 'name', keypath: 'name', options: {unique: false}},
//       {name: 'phone', keypath: 'phone', options: {unique: true}},
//     ],
//   },
// ])
//   .then(success => alert('user create success !'))
//   .catch(e => alert('oops! error..'));

// insert('db', 'user', {name: 'kim', phone: '010-0000-0000' })
//   .then(success => alert('success = {id: 1, name: kim , phone: 010-0000-0000 }'))
//   .catch(error => alert('user does not exit'));

// findById('db', 'user', 1)
//   .then(success => alert('success = {id: 1, name: kim , phone: 010-0000-0000 }'))
//   .catch(error => alert('user does not exit'));

// findByKey('db', 'user', 'phone', '010-0000-0000')
//   .then(success => alert('success = 1')
//   .catch(error => alert('user does not exit'));

// findByValue('db', 'user', 'phone', '010-0000-0000')
//   .then(success => alert('success = {id: 1, name: kim , phone: 010-0000-0000 }'))
//   .catch(error => alert('user does not exit'));

//  findAll('db', 'user')
//    .then(success => alert('success = [{id: 1, name: kim , phone: 010-0000-0000 }]'))
//   .catch(error => alert('user does not exit'));

// findAllKeys('db', 'user')
//   .then(success => alert('success = [1]'))
//   .catch(error => alert('user does not exit'));

// count('db', 'user')
//   .then(success => alert('success = 1'))
//   .catch(error => alert('user does not exit'));

// update('db', 'user', {
//   name: 'kims-acount',
//   phone: '010-0000-0000',
//   id: 1,
// })
//   .then(success => alert('update kims-acount success!!'))
//   .catch(error => alert('user does not exit'));

// deleteByKey('db', 'user', 'phone', '010-0000-0000')
//   .then(success => alert('kims-acount delete success!!'))
//   .catch(error => alert('user does not exit'));
