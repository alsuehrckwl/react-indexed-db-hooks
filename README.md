<br/>
<br/>
<h3 align="center">React indexedDB Hooks</h3>
<h3 align="center">WebAPI IndexedDB + react with hooks = 💖</h3>
<br/>

## 
<br/>

## Install

Several quick start options are available:

- Install with [npm](https://www.npmjs.com/): `npm install react-indexed-db-hooks`
- Install with [yarn](https://yarnpkg.com/): `yarn add react-indexed-db-hooks`

## Reqirement
- Need a higher react 16.8 version

## Development and demo
- git clone https://github.com/alsuehrckwl/react-indexed-db-hooks.git
- npm install or yarn
- npm start or yarn start
- open brower http://localhost:1234/

## How to use
- Project root init provide IndexedDBProvider.
- Init initialState in databaseName, version
- Init initialState in schemas indexedDB objectStores 

```
import {IndexedDBProvider, IndexedDBReducer} from './indexedDBProvider';

<IndexedDBProvider
  initialState={{databaseName: 'user', version: 1, schemas: [
      {
        schema: 'info',
        autoIncrement: {keyPath: 'id', autoIncrement: true},
        indexes: [
          {name: 'name', keypath: 'name', options: {unique: false}},
          {name: 'phone', keypath: 'phone', options: {unique: true}},
          {name: 'gender', keypath: 'gender', options: {unique: false}}
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
    ]}}
  reducer={IndexedDBReducer}
>
  // child component
</IndexedDBProvider>
```

<br/>

- Use ObserveTransaction component (only insert, delete, clear observation)
```
import { ObserveTransaction } from 'react-indexed-db-hooks';

/*
  scheme : require (string)
  index : require (string)
  value : default null (string | number)
  loading : deafault false (boolean)
  loadingComponent default null (Component)
 */

<ObserveTransaction
  schema="info"
  index="gender"
  value="male">
  {({ result }) => {
    if (!!result) {
      return result.map((item, idx) => <div>
        <p>name: {item.name}</p>
        <p>phone: {item.phone}</p>
      </div>);
    } else {
      return <div>empty users..</div>;
    }
  }}
</ObserveTransaction>
```

<br/>

- import useIndexedDB in your project.

```
import { useIndexedDB } from 'react-indexed-db-hooks';

const {
  insert,
  findById,
  findByKey,
  findByValue,
  findAll,
  findAllKeys,
  count,
  update,
  deleteByKey,
  claer
} = useIndexedDB();

```

insert :
 ```
insert('info', {name: 'Hudson', phone: '010-1111-1111', gender: 'male' })
  .then(success => {
    consolel.log('success = ', success)
  })
  .catch(error => alert(error));
 ```
 
findById :
 ```
findById('info', 1)
    .then(success => console.log('success = ', success))
    .catch(error => alert(error));
 ```

findByKey :
 ```
findByKey('info', 'phone', '010-0000-0000')
  .then(success => console.log('success = ', success))
  .catch(error => alert(error));
 ```

findByValue :
```
findByValue('info', 'phone', '010-0000-0000')
  .then(success => console.log('success = ', success))
  .catch(error => alert(error));
```
 
 findAll :
 ```
 findAll('info')
  .then(success => console.log('success = ', success))
  .catch(error => alert(error));
 ```

findAllKeys :
```
findAllKeys('info')
  .then(success => console.log('success = ', success))
  .catch(error => alert(error));
 ```

count :
```
count('info')
  .then(success => console.log('success = ', success))
  .catch(error => alert(error));
```

update :
```
update('info', {
  name: 'kims-acount',
  phone: '010-0000-0000',
  gender: 'female',
  id: 3,
})
  .then(success => console.log('update kims-acount success!! = ', success))
  .catch(error => alert(error));
```

deleteByKey : 
```
deleteByKey('info', 1)
  .then(success => console.log('key 1 is delete = ', success))
  .catch(error => alert(error));
```

deleteByValue : 
```
deleteByKey('info', 'phone', '010-0000-0000')
  .then(success => console.log('kims-acount delete success!! = ', success))
  .catch(error => alert(error));
```

deleteAllIndexMatchValue:
```
deleteAllIndexMatchValue('info', 'gender', 'male')
  .then(success => console.log('male data all delete = ', success))
  .catch(error => alert(error));
```

clear : 
```
clear('info')
  .then(success => console.log('info clear success!! = ', success))
  .catch(error => alert(error));
```

## TODOS
- cursor
- create index, delete index
- mutation
- error, abort, loading, success

