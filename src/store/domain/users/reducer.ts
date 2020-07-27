import { Map, fromJS } from 'immutable';
import { Reducer } from 'redux';
import { GithubUserInterface } from '../../../api/types';
import { Maybe } from '../../../commonTypes';
import { Action } from '../../types';
import * as UsersConstants from './constants';
import { OnBatchUsersBaseDataPayload } from './actionPayloads';
import { UserBaseDataRecordInterface } from './models';

export type UsersBaseDataSlice = Map<number, UserBaseDataRecordInterface>;

export interface UsersState extends Map<string, any> {
  usersBaseData: UsersBaseDataSlice;
  selectedUser: Maybe<GithubUserInterface>;
}

const initialState: UsersState = fromJS({
  usersBaseData: {},
  selectedUser: null,
});

export const usersReducer: Reducer<UsersState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case UsersConstants.onBatchUsersBaseData: {
      const {
        payload: { users, isInitialBatch },
      }: Action<OnBatchUsersBaseDataPayload> = action;

      if (isInitialBatch) {
        return <UsersState>state.set('usersBaseData', users);
      }

      return <UsersState>(
        state.set('usersBaseData', state.get('usersBaseData').merge(users))
      );
    }

    // case UsersConstants.onSetSelectedUser: {
    //   const { user } = action.payload;
    //   return {
    //     ...state,
    //     selectedUser: user,
    //   };
    // }
    default: {
      return state;
    }
  }
};
