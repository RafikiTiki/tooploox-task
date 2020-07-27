import * as RepositoriesConstants from './constants';
import {
  OnFetchUserPopularRepositoriesPayload,
  OnSetUserPopularRepositoriesPayload,
} from './payloads';
import { Action } from '../../types';
import createAction from '../../createAction';

export const onFetchUserPopularRepositories = (
  payload: OnFetchUserPopularRepositoriesPayload,
): Action<OnFetchUserPopularRepositoriesPayload> =>
  createAction(RepositoriesConstants.onFetchUserPopularRepositories, payload);

export const onSetUserPopularRepositories = (
  payload: OnSetUserPopularRepositoriesPayload,
): Action<OnSetUserPopularRepositoriesPayload> =>
  createAction(RepositoriesConstants.onSetUserPopularRepositories, payload);
