import {indexedDB} from './indexedDB';
import useIndexedDB from './useIndexedDB';
import '@babel/polyfill';

const {createDatabase, openDatabase, createSchema} = useIndexedDB();

createSchema('picksmatch', 2, 'soccer');
