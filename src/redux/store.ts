import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const loggerMiddleware = createLogger({ collapsed: true });

const middlewares = [
  sagaMiddleware,
  routerMiddleware,
  ...(process.env.NODE_ENV === 'development' ? [loggerMiddleware] : []),
];

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_ENCRYPTOR_KEY || '',
    }),
  ],
  version: 1,
  whitelist: ['user'],
};

export const rootReducer = combineReducers({
  ...rootReducers,
  router: routerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: false,
    }),
    ...middlewares,
  ],
  reducer: persistedReducer,
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export const history = createReduxHistory(store);

export { persistor, store };
