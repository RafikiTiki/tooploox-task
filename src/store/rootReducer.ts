import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { usersReducer } from './domain/users/reducer';
import { requestsReducer } from './domain/requests/reducer';
import { domain as UsersDomain } from './domain/users/constants';
import { domain as RequestsDomain } from './domain/requests/constants';
import { domain as AlertsDomain } from './component/alerts/constants';
import { alertsReducer } from './component/alerts/reducer';

const rootReducer = combineReducers({
  [UsersDomain]: usersReducer,
  [RequestsDomain]: requestsReducer,
  [AlertsDomain]: alertsReducer,
});

export default rootReducer;
