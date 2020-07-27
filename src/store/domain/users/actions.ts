import * as UsersConstants from './constants';
import {
  OnBatchUsersBaseDataPayload,
  OnFetchUserDetailsPayload,
  OnSearchUsersPayload,
  OnSetSelectedUserPayload,
} from './actionPayloads';
import { Action } from '../../types';
import createAction from '../../createAction';

export const onSearchUsers = (
  payload: OnSearchUsersPayload,
): Action<OnSearchUsersPayload> =>
  createAction(UsersConstants.onSearchUsers, payload);

export const onBatchUsersBaseData = (
  payload: OnBatchUsersBaseDataPayload,
): Action<OnBatchUsersBaseDataPayload> =>
  createAction(UsersConstants.onBatchUsersBaseData, payload);

export const onSetSelectedUser = (
  payload: OnSetSelectedUserPayload,
): Action<OnSetSelectedUserPayload> =>
  createAction(UsersConstants.onSetSelectedUser, payload);

export const onFetchUserDetails = (
  payload: OnFetchUserDetailsPayload,
): Action<OnFetchUserDetailsPayload> =>
  createAction(UsersConstants.onFetchUserDetails, payload);
