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

## How to use

import useIndexedDB in your project.

```
import { useIndexedDB } from 'react-indexed-db-hooks';

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

```

openDatabase :
```
openDatabase('db')
  .then(success => alert('database open success !'))
  .catch(e => alert('db does not exit..'))
```

createSchema :
```
createSchema('db', [
  {
    schema: 'user',
    autoIncrement: {keyPath: 'id', autoIncrement: true},
    indexes: [
      {name: 'name', keypath: 'name', options: {unique: false}},
      {name: 'phone', keypath: 'phone', options: {unique: true}},
    ],
  },
])
  .then(success => alert('user create success !'))
  .catch(e => alert('oops! error..'));
 ```

insert :
 ```
insert('db', 'user', {name: 'kim' , phone: '010-0000-0000' })
  .then(success => alert('success = {id: 1, name: 'kim' , phone: '010-0000-0000' }'))
  .catch(error => alert('user does not exit'));
 ```
 
findById :
 ```
findById('db', 'user', 1)
  .then(success => alert('success = {id: 1, name: 'kim' , phone: '010-0000-0000' }'))
  .catch(error => alert('user does not exit'));
 ```

findByKey :
 ```
findByKey('db', 'user', 'phone', '010-0000-0000')
  .then(success => alert('success = 1')
  .catch(error => alert('user does not exit'));
 ```

findByValue :
```
findByValue('db', 'user', 'phone', '010-0000-0000')
  .then(success => alert('success = {id: 1, name: 'kim' , phone: '010-0000-0000' }'))
  .catch(error => alert('user does not exit'));
```
 
 findAll :
 ```
 findAll('db', 'user')
   .then(success => alert('success = [{id: 1, name: 'kim' , phone: '010-0000-0000' }]'))
  .catch(error => alert('user does not exit'));
 ```

findAllKeys :
```
findAllKeys('db', 'user')
  .then(success => alert('success = [1]'))
  .catch(error => alert('user does not exit'));
 ```

count :
```
count('db', 'user')
  .then(success => alert('success = 1'))
  .catch(error => alert('user does not exit'));
```

update :
```
update('db', 'user', {
  name: 'kims-acount', 
  phone: '010-0000-0000',
  id: 1,
})
  .then(success => alert('update kims-acount success!!'))
  .catch(error => alert('user does not exit'));
```

deleteByKey : 
```
deleteByKey('db', 'user', 'phone', '010-0000-0000')
  .then(success => alert('kims-acount delete success!!'))
  .catch(error => alert('user does not exit'));
```

## TODOS
- cursor
- index
- react context, consumer
- <Query />
- <Mutation />
- error, abort, loading, success

