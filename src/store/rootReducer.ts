import { combineReducers } from 'redux-immutable';

import { domain as UsersDomain } from './domain/users/constants';
import { usersReducer } from './domain/users/reducer';

import { domain as RequestsDomain } from './domain/requests/constants';
import { requestsReducer } from './domain/requests/reducer';

import { domain as RepositoriesDomain } from './domain/repositories/constants';
import { repositoriesReducer } from './domain/repositories/reducer';

import { domain as AlertsDomain } from './component/alerts/constants';
import { alertsReducer } from './component/alerts/reducer';

const rootReducer = combineReducers({
  [UsersDomain]: usersReducer,
  [RequestsDomain]: requestsReducer,
  [RepositoriesDomain]: repositoriesReducer,
  [AlertsDomain]: alertsReducer,
});

export default rootReducer;
