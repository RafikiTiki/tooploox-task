import { Map, List, fromJS } from 'immutable';
import { Reducer } from 'redux';
import { Maybe } from '../../../commonTypes';
import { Action } from '../../types';
import * as UsersConstants from './constants';
import { OnBatchUsersBaseDataPayload } from './actionPayloads';
import { GithubUserRecordInterface } from './models';

export type UsersBaseDataSlice = Map<number, GithubUserRecordInterface>;
export type SelectedUserDataSlice = Maybe<GithubUserRecordInterface>;

export interface UsersState extends Map<string, any> {
  usersBaseData: UsersBaseDataSlice;
  searchUserIds: List<number>;
  selectedUserData: SelectedUserDataSlice;
}

const initialState: UsersState = fromJS({
  usersBaseData: {},
  searchUserIds: [],
  selectedUserData: null,
});

export const usersReducer: Reducer<UsersState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case UsersConstants.onBatchUsersBaseData: {
      const {
        payload: { users, userIds, isInitialBatch },
      }: Action<OnBatchUsersBaseDataPayload> = action;

      if (isInitialBatch) {
        return <UsersState>(
          state.set('usersBaseData', users).set('searchUserIds', userIds)
        );
      }

      return <UsersState>(
        state
          .set('usersBaseData', state.get('usersBaseData').merge(users))
          .update('searchUserIds', (currentUserIds) =>
            currentUserIds.concat(userIds),
          )
      );
    }

    case UsersConstants.onSetSelectedUserData: {
      const { user } = action.payload;
      return <UsersState>state.set('selectedUserData', user);
    }
    default: {
      return state;
    }
  }
};
