import React from 'react';
import {
  ObserveConsumer,
  IndexedDBStateValue,
  IndexedDBContext,
} from './indexedDBProvider';
import {useIndexedDB} from './useIndexedDB';
import {useState} from 'react';
import {useEffect} from 'react';

export function ObserveTransaction({
  children,
  schema,
  index,
  value = null,
  loading = false,
  loadingComponent = null,
}) {
  const [result, setResult] = useState(null);
  const {findAll} = useIndexedDB();
  const [state, dispatch] = IndexedDBStateValue(IndexedDBContext);

  useEffect(() => {
    findAll(schema).then(success => {
      if (!!value) {
        setResult(success.filter(item => item[index] === value));
      } else {
        setResult(success);
      }
    });
  }, []);

  return (
    <ObserveConsumer>
      {({success, error, isTransactionCall}) => {
        if (isTransactionCall && success) {
          findAll(schema).then(success => {
            if (!!value) {
              setResult(success.filter(item => item[index] === value));
            } else {
              setResult(success);
            }

            dispatch({
              type: 'finishTransaction',
            });
          });
        }

        if (isTransactionCall && loading) {
          return loadingComponent;
        } else {
          return children({result});
        }
      }}
    </ObserveConsumer>
  );
}
