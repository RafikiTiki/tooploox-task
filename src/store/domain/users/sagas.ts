import { List, Map } from 'immutable';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import pick from 'lodash/pick';
import * as UsersConstants from './constants';
import { Action } from '../../types';
import {
  OnFetchUserDetailsPayload,
  OnSearchUsersPayload,
} from './actionPayloads';
import { fetchUserData, searchGithubUsers } from '../../../api';
import { GithubUserBaseDataInterface } from '../../../api/types';
import { onBatchUsersBaseData, onSetSelectedUserData } from './actions';
import * as RequestActions from '../requests/actions';
import RequestType from '../requests/requestType';
import RequestStatus from '../requests/requestStatus';
import { selectRequestNextPage } from '../requests/selectors';
import { GithubUser } from './models';
import { onFetchUserPopularRepositories } from '../repositories/actions';

export function* onSearchUsers({
  payload: { searchPhrase, isInitialSearch },
}: Action<OnSearchUsersPayload>) {
  const requestType = RequestType.SEARCH_USERS;
  try {
    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.LOADING),
    );

    let page;
    if (isInitialSearch) {
      page = 1;
    } else {
      page = yield select(selectRequestNextPage, requestType);
    }

    if (page) {
      const { nextPage, data } = yield call(
        searchGithubUsers,
        searchPhrase,
        page,
      );

      let usersBaseData: Map<number, GithubUserBaseDataInterface> = Map();
      let userIds: List<number> = List();

      data.items.forEach((githubUser: GithubUserBaseDataInterface) => {
        const userBaseData = pick(githubUser, ['id', 'login', 'avatar_url']);
        const userRecord = GithubUser(userBaseData);
        usersBaseData = usersBaseData.set(userBaseData.id, userRecord);
        userIds = userIds.push(userBaseData.id);
      });

      yield put(
        onBatchUsersBaseData({
          users: usersBaseData,
          userIds,
          isInitialBatch: isInitialSearch,
        }),
      );
      yield put(RequestActions.onSetRequestNextPage(requestType, nextPage));
    }

    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.SUCCESS),
    );
  } catch (error) {
    console.error(error);
    yield put(
      RequestActions.onSetRequestStatus(
        requestType,
        RequestStatus.FAILURE,
        error,
      ),
    );
  }
}

export function* onFetchUserData(login: string) {
  const requestType = RequestType.FETCH_USER_DATA;
  try {
    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.LOADING),
    );

    const { data } = yield call(fetchUserData, login);
    const user = GithubUser(data);
    yield put(onSetSelectedUserData({ user }));

    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.SUCCESS),
    );
  } catch (error) {
    console.error(error);
    yield put(
      RequestActions.onSetRequestStatus(
        requestType,
        RequestStatus.FAILURE,
        error,
      ),
    );
  }
}

export function* onFetchUserDetails({
  payload: { login },
}: Action<OnFetchUserDetailsPayload>) {
  try {
    yield call(onFetchUserData, login);
    yield put(onFetchUserPopularRepositories({ login }));
  } catch (error) {
    console.error(error);
  }
}

export function* usersSaga() {
  yield takeLatest(UsersConstants.onSearchUsers, onSearchUsers);
  yield takeLatest(UsersConstants.onFetchUserDetails, onFetchUserDetails);
}
