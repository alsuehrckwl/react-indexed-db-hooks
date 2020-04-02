import React from 'react';
import ReactDOM from 'react-dom';
import {useIndexedDB} from './useIndexedDB';
import {IndexedDBProvider, IndexedDBReducer} from './indexedDBProvider';

const Root = () => {
  return (
    <IndexedDBProvider
      initialState={{
        databaseName: 'user',
        version: 1,
        schemas: [
          {
            schema: 'info',
            autoIncrement: {keyPath: 'id', autoIncrement: true},
            indexes: [
              {name: 'name', keypath: 'name', options: {unique: false}},
              {name: 'phone', keypath: 'phone', options: {unique: true}},
            ],
          },
          {
            schema: 'auth',
            autoIncrement: {keyPath: 'id', autoIncrement: true},
            indexes: [
              {name: 'userId', keypath: 'userId', options: {unique: true}},
              {name: 'password', keypath: 'password', options: {unique: false}},
            ],
          },
        ],
      }}
      reducer={IndexedDBReducer}
    >
      <Users />
    </IndexedDBProvider>
  );
};

const Users = () => {
  const {
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

  // count: ƒ count()
  // openCursor: ƒ openCursor()
  // openKeyCursor: ƒ openKeyCursor()
  // index: ƒ index()
  // createIndex: ƒ createIndex()
  // deleteIndex: ƒ deleteIndex()

  // insert('info', {name: 'Hudson', phone: '010-1111-1111' })
  //   .then(success => {
  //     consolel.log('success = ', success)
  //   })
  //   .catch(error => alert(error));

  // findById('info', 3)
  //   .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  // findByKey('info', 'phone', '010-0000-0000')
  //   .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  // findByValue('info', 'phone', '010-0000-0000')
  //   .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  //  findAll('info')
  //    .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  // findAllKeys('info')
  //   .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  // count('info')
  //   .then(success => console.log('success = ', success))
  //   .catch(error => alert(error));

  // update('info', {
  //   name: 'kims-acount',
  //   phone: '010-0000-0000',
  //   id: 3,
  // })
  //   .then(success => console.log('update kims-acount success!! = ', success))
  //   .catch(error => alert(error));

  // deleteByKey('info', 'phone', '010-0000-0000')
  //   .then(success => console.log('kims-acount delete success!! = ', success))
  //   .catch(error => alert(error));

  return <div>users!</div>;
};

ReactDOM.render(<Root />, document.getElementById('app'));
