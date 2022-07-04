import { all, call, spawn } from 'redux-saga/effects';

import productSaga from './sagas/productSaga';
import userSaga from './sagas/userSaga';

export default function* rootSaga() {
  const sagas = [userSaga, productSaga];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('Saga error, the saga will be restarted', e);
          }
        }
      })
    )
  );
}
