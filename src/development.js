import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {useIndexedDB} from './useIndexedDB';
import {IndexedDBProvider, IndexedDBReducer} from './indexedDBProvider';
import {ObserveTransaction} from './ObserveTransaction';

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
              {name: 'phone', keypath: 'phone', options: {unique: true}},
              {name: 'name', keypath: 'name', options: {unique: false}},
              {name: 'gender', keypath: 'gender', options: {unique: false}},
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
  const [info, setInfo] = useState({
    name: '',
    phone: '',
    gender: 'male',
  });
  const [auth, setAuth] = useState({
    userId: '',
    password: '',
  });
  const {insert, deleteByKey, deleteAllIndexMatchValue, clear} = useIndexedDB();

  function submit(e) {
    e.preventDefault();
    return;
  }

  function submitForm() {
    insert('info', info)
      .then(success => {
        console.log('success = ', success);
      })
      .catch(error => alert(error));
  }

  function onChangeInfo(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInfo({
      ...info,
      [name]: value,
    });
  }

  function deleteInfoItem(item) {
    deleteByKey('info', item.id)
      .then(success => console.log('success = ', success))
      .catch(error => alert(error));
  }

  function deleteGenderType(type) {
    deleteAllIndexMatchValue('info', 'gender', type)
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function clearAllData() {
    clear('info');
  }

  return (
    <div>
      <form
        onSubmit={submit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          margin: 40,
        }}
      >
        <input
          value={info.name}
          onChange={onChangeInfo}
          name="name"
          id="name"
          placeholder="name"
          style={{marginBottom: 8}}
        />
        <input
          value={info.phone}
          onChange={onChangeInfo}
          name="phone"
          id="phone"
          placeholder="phone"
          style={{marginBottom: 8}}
        />
        <select
          name="gender"
          id="gender"
          value={info.gender}
          onChange={onChangeInfo}
          style={{marginBottom: 8}}
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button onClick={submitForm} style={{marginBottom: 8}}>
          submit
        </button>
        <button
          onClick={() => deleteGenderType('male')}
          style={{marginBottom: 8}}
        >
          delete male
        </button>
        <button
          onClick={() => deleteGenderType('female')}
          style={{marginBottom: 8}}
        >
          delete female
        </button>
        <button onClick={clearAllData}>clear data</button>
      </form>
      <ul>
        <ObserveTransaction schema="info" index="gender">
          {({result}) => {
            if (!!result) {
              if (result.length > 0) {
                return result.map((item, idx) => (
                  <li
                    key={`info-list-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: 500,
                      marginBottom: 8,
                      padding: 8,
                      border: '1px solid #dedede',
                    }}
                  >
                    <span
                      style={{
                        width: 100,
                        marginRight: 24,
                      }}
                    >
                      <small>name:</small> {item.name}
                    </span>
                    <span
                      style={{
                        width: 200,
                        marginRight: 24,
                      }}
                    >
                      <small>phone:</small> {item.phone}
                    </span>
                    <span
                      style={{
                        width: 130,
                      }}
                    >
                      <small>gender:</small>{' '}
                      {item.gender === 'male' ? '🙋‍♂️' : '🙋‍♀️'}
                    </span>
                    <button onClick={() => deleteInfoItem(item)}>x</button>
                  </li>
                ));
              } else {
                return <div>empty users..</div>;
              }
            } else {
              return <div>empty users..</div>;
            }
          }}
        </ObserveTransaction>
      </ul>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('app'));
