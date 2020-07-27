import { all } from 'redux-saga/effects';
import { usersSaga } from './domain/users/sagas';
import { repositoriesSaga } from './domain/repositories/sagas';

export default function* rootSaga() {
  yield all([usersSaga(), repositoriesSaga()]);
}
