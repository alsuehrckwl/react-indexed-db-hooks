import React, {createContext, useContext, useReducer} from 'react';
import {indexedDB} from './indexedDB';
import {InitDatabase} from './initDatabase';

export const IndexedDBInitialState = {
  databaseName: '',
  version: 1,
  indexedDB: new indexedDB(),
  db: null,
  schemas: [],
  transaction: {
    isTransactionCall: false,
    schema: '',
    type: '',
    data: null,
    request: {
      success: false,
      error: false,
    },
  },
};

export const IndexedDBReducer = (state, action) => {
  switch (action.type) {
    case 'initDatabase':
      return {
        ...state,
        db: action.db,
      };

    case 'updateVersion':
      return {
        ...state,

        version: action.version,
      };

    case 'closeDatabase':
      state.indexedDB.close();

      return {
        ...state,
        IndexedDBInitialState,
      };

    case 'setTransaction':
      return {
        ...state,
        transaction: action.transaction,
      };

    case 'finishTransaction':
      return {
        ...state,
        transaction: IndexedDBInitialState.transaction,
      };

    default:
      return state;
  }
};

export const IndexedDBContext = createContext(IndexedDBInitialState);

export const IndexedDBProvider = ({reducer, initialState, children}) => {
  const state = {...IndexedDBInitialState, ...initialState};

  return (
    <IndexedDBContext.Provider value={useReducer(reducer, state)}>
      <InitDatabase>{children}</InitDatabase>
    </IndexedDBContext.Provider>
  );
};

export const IndexedDBStateValue = () => useContext(IndexedDBContext);

export function ObserveConsumer({children}) {
  return (
    <IndexedDBContext.Consumer>
      {state => {
        const {transaction} = state[0];
        const {success, error} = transaction.request;

        return children({
          success,
          error,
          isTransactionCall: transaction.isTransactionCall,
        });
      }}
    </IndexedDBContext.Consumer>
  );
}
