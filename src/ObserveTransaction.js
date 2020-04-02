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
  value,
  loading = false,
  loadingComponent = null,
}) {
  const [result, setResult] = useState(null);
  const {findAll} = useIndexedDB();
  const [state, dispatch] = IndexedDBStateValue(IndexedDBContext);

  useEffect(() => {
    findAll(schema).then(success => {
      setResult(success.filter(item => item[index] === value));
    });
  }, []);

  return (
    <ObserveConsumer>
      {({success, error, isTransactionCall}) => {
        if (isTransactionCall && success) {
          findAll(schema).then(success => {
            const data = success.filter(item => item[index] === value);
            console.log(data);
            setResult(data);

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
