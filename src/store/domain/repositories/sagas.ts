import { put, takeLatest, call } from 'redux-saga/effects';
import { List } from 'immutable';
import * as RepositoriesConstants from './constants';
import { onSetUserPopularRepositories } from './actions';
import { Action } from '../../types';
import { OnFetchUserPopularRepositoriesPayload } from './payloads';
import RequestType from '../requests/requestType';
import * as RequestActions from '../requests/actions';
import RequestStatus from '../requests/requestStatus';
import { GithubRepoInterface } from '../../../api/types';
import { fetchUserReposPage } from '../../../api';
import { GithubRepo } from './models';

function* onFetchUserPopularRepositories({
  payload: { login },
}: Action<OnFetchUserPopularRepositoriesPayload>) {
  const requestType = RequestType.FETCH_USER_POPULAR_REPOS;
  try {
    yield put(
      RequestActions.onSetRequestStatus(requestType, RequestStatus.LOADING),
    );

    const userRepos: GithubRepoInterface[] = [];

    const reposResponse = yield call(fetchUserReposPage, login, '1');
    const { data } = reposResponse;
    let { nextPage: pageToFetch } = reposResponse;
    userRepos.push(...data);

    // Unfortunately GitHub API doesn't give us option to sort user repos by stars count,
    // so we have to fetch all user github repos and sort them by hand to pick most popular ones
    while (pageToFetch) {
      const nextReposResponse = yield call(
        fetchUserReposPage,
        login,
        pageToFetch,
      );
      const { data: nextData, nextPage } = nextReposResponse;
      userRepos.push(...nextData);
      pageToFetch = nextPage;
    }

    const mostPopularUserRepos = List(
      userRepos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3)
        .map((repo) => GithubRepo(repo)),
    );

    yield put(
      onSetUserPopularRepositories({
        repositories: mostPopularUserRepos,
      }),
    );

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

export function* repositoriesSaga() {
  yield takeLatest(
    RepositoriesConstants.onFetchUserPopularRepositories,
    onFetchUserPopularRepositories,
  );
}
