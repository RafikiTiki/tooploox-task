import * as UsersConstants from './constants';
import {
  OnBatchUsersBaseDataPayload,
  OnFetchUserDetailsPayload,
  OnSearchUsersPayload,
  onSetSelectedUserDataPayload,
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

export const onSetSelectedUserData = (
  payload: onSetSelectedUserDataPayload,
): Action<onSetSelectedUserDataPayload> =>
  createAction(UsersConstants.onSetSelectedUserData, payload);

export const onFetchUserDetails = (
  payload: OnFetchUserDetailsPayload,
): Action<OnFetchUserDetailsPayload> =>
  createAction(UsersConstants.onFetchUserDetails, payload);
