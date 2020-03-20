import {indexedDB} from './indexedDB';
import useIndexedDB from './useIndexedDB';
import '@babel/polyfill';

const test = useIndexedDB();

test.createDatabase('ohMyGod').success(s => console.log(s));
