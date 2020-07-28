import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { UsersState } from './domain/users/reducer';
import { domain as UsersDomain } from './domain/users/constants';
import { domain as RequestsDomain } from './domain/requests/constants';
import { RequestsState } from './domain/requests/reducer';

export interface RootState extends Map<string, any> {
  [UsersDomain]: UsersState;
  [RequestsDomain]: RequestsState;
}

const sagaMiddleware = createSagaMiddleware();

const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);
