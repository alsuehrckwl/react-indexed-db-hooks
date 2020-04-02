import React, {useState, useEffect} from 'react';
import {IndexedDBStateValue, IndexedDBContext} from './indexedDBProvider';
import {useIndexedDB} from './useIndexedDB';

export function InitDatabase(props) {
  const [isInit, setInit] = useState(false);
  const [state, dispatch] = IndexedDBStateValue(IndexedDBContext);
  const {createSchema} = useIndexedDB();

  useEffect(() => {
    createSchema(state.schemas, state.version)
      .then(success => {
        if (!state.db) {
          dispatch({
            type: 'initDatabase',
            db: success,
          });
          dispatch({
            type: 'updateVersion',
            version: success.version,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    while (!!state.db) {
      setInit(true);
      return;
    }
  }, [state.db]);

  if (isInit) {
    return props.children;
  } else {
    return null;
  }
}
