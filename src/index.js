import {indexedDB} from './indexedDB';
import useIndexedDB from './useIndexedDB';
import '@babel/polyfill';

const {createDatabase, openDatabase, createSchema} = useIndexedDB();

// openDatabase('picksmatch').then(res => console.log(res)).catch(e => console.log(e))
createSchema('picksmatch', [
  {
    schema: 'soccerFavorite',
    autoIncrement: {keyPath: 'id', autoIncrement: true},
    indexes: [
      {name: 'gameId', keypath: 'gameId', options: {unique: true}},
      {name: 'date', keypath: 'date', options: {unique: false}},
    ],
  },
]);
