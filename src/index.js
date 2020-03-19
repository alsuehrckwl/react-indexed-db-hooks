import {indexedDB} from './indexedDB';

const test = new indexedDB();
console.log('test = ', test);
test.open('myTestDB');
