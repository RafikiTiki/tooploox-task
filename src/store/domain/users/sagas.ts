import { Map } from 'immutable';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import pick from 'lodash/pick';
import * as UsersConstants from './constants';
import { Action } from '../../types';
import { OnSearchUsersPayload } from './actionPayloads';
import { searchGithubUsersSaga } from '../../../api';
import { GithubUserBaseDataInterface } from '../../../api/types';
import { onBatchUsersBaseData } from './actions';
import * as RequestActions from '../requests/actions';
import RequestType from '../requests/requestType';
import RequestStatus from '../requests/requestStatus';
import { selectRequestNextPage } from '../requests/selectors';
import { GithubUser } from './models';

export function* onSearchUsers(action: Action<OnSearchUsersPayload>) {
  const requestType = RequestType.SEARCH_USERS;
  try {
    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.LOADING),
    );
    const { searchPhrase, isInitialSearch } = action.payload;

    let page;
    if (isInitialSearch) {
      page = 1;
    } else {
      page = yield select(selectRequestNextPage, requestType);
    }

    if (page) {
      const { nextPage, data } = yield call(
        searchGithubUsersSaga,
        searchPhrase,
        page,
      );

      let usersBaseData: Map<number, GithubUserBaseDataInterface> = Map();

      data.items.forEach((githubUser: GithubUserBaseDataInterface) => {
        const userBaseData = pick(githubUser, ['id', 'login', 'avatar_url']);
        const userRecord = GithubUser(userBaseData);
        usersBaseData = usersBaseData.set(userBaseData.id, userRecord);
      });

      yield put(
        onBatchUsersBaseData({
          users: usersBaseData,
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
        RequestType.SEARCH_USERS,
        RequestStatus.FAILURE,
        error,
      ),
    );
  }
}

export function* usersSaga() {
  yield takeLatest(UsersConstants.onSearchUsers, onSearchUsers);
}
