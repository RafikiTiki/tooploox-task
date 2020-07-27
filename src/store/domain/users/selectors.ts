import { List } from 'immutable';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { RootState } from '../../index';
import { UsersBaseDataSlice, UsersState } from './reducer';
import { domain as UsersDomain } from './constants';

export const selectUsersDomain = (state: RootState): UsersState =>
  state.get(UsersDomain);

export const selectUsersBaseDataDomain = createSelector(
  selectUsersDomain,
  (domain) => domain.get('usersBaseData') as UsersBaseDataSlice,
);

export const selectSearchUserIds = createSelector(
  selectUsersDomain,
  (domain) => domain.get('searchUserIds') as List<number>,
);

// args: userId
export const selectGithubUserBaseData = createCachedSelector(
  selectUsersBaseDataDomain,
  (_: RootState, userId: number) => userId,
  (usersBaseData, userId) => usersBaseData.get(userId),
)((_, userId) => userId);
