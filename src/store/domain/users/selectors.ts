import { RootState } from '../../index';
import { UsersBaseDataSlice, UsersState } from './reducer';
import { domain as UsersDomain } from './constants';
import { createSelector } from 'reselect';

export const selectUsersDomain = (state: RootState): UsersState =>
  state.get(UsersDomain);

export const selectUsersBaseDataDomain = createSelector(
  selectUsersDomain,
  (domain) => domain.get('usersBaseData') as UsersBaseDataSlice,
);

export const selectSearchUserIds = createSelector(
  selectUsersBaseDataDomain,
  (usersBaseData) => usersBaseData.keySeq().toList(),
);

export const selectSearchUsersData = createSelector(
  selectUsersBaseDataDomain,
  (usersBaseData) => usersBaseData.valueSeq().toList(),
);
