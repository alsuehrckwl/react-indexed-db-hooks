import React, {useState, useEffect} from 'react';
import {IndexedDBStateValue, IndexedDBContext} from './indexedDBProvider';
import {useIndexedDB} from './useIndexedDB';

export function InitDatabase(props) {
  const [isInit, setInit] = useState(false);
  const [state, dispatch] = IndexedDBStateValue(IndexedDBContext);
  const {openDatabase, createSchema} = useIndexedDB();

  useEffect(() => {
    openDatabase().then(success => {
      dispatch({
        type: 'updateVersion',
        version: success.result.version,
      });

      if (!state.db) {
        dispatch({
          type: 'initDatabase',
          db: success.result,
        });
      }

      if (success.result.objectStoreNames.length === 0) {
        createSchema(state.schemas);
      }
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
