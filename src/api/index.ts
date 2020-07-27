import {
  FetchPageableUserRepos,
  GithubApiResponse,
  GithubRepo,
  GithubUserInterface,
  GithubUserBaseDataInterface,
} from './types';
import { Maybe } from '../commonTypes';
import { getNextPage, processResponse } from './utils';

const API_ROOT = 'https://api.github.com';

export async function searchGithubUsersSaga(
  searchPhrase: string,
  page: string,
): Promise<GithubApiResponse<GithubUserBaseDataInterface[]>> {
  const query = encodeURIComponent(`${searchPhrase} in:fullname`);
  const url = `${API_ROOT}/search/users?q=${query}${
    page ? `&page=${page}` : ''
  }`;
  const response = await fetch(url);
  return processResponse(response);
}

export async function searchGithubUsers(
  searchPhrase: string,
  page: string,
): Promise<GithubApiResponse<GithubUserBaseDataInterface[]>> {
  try {
    const query = encodeURIComponent(`${searchPhrase} in:fullname`);
    const url = `${API_ROOT}/search/users?q=${query}${
      page ? `&page=${page}` : ''
    }`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      data: data.items || [],
      error: data.message || null,
      nextPage: getNextPage(response),
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error: error.message,
    };
  }
}

export async function fetchUserData(
  login: string,
): Promise<GithubApiResponse<Maybe<GithubUserInterface>>> {
  try {
    const username = encodeURIComponent(login);
    const response = await fetch(`${API_ROOT}/users/${username}`);
    const data = await response.json();

    return {
      data: data || null,
      error: data.message || null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: error.message,
    };
  }
}

async function fetchUserReposPage(
  login: string,
  page?: string,
): Promise<FetchPageableUserRepos> {
  const username = encodeURIComponent(login);
  const url = `${API_ROOT}/users/${username}/repos${
    page ? `?page=${page}` : ''
  }`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    data,
    errorMessage: data.message,
    nextPage: getNextPage(response),
  };
}

export async function fetchUserPopularRepos(
  login: string,
): Promise<GithubApiResponse<GithubRepo[]>> {
  try {
    const userRepos: GithubRepo[] = [];

    const reposResponse = await fetchUserReposPage(login);
    const { data } = reposResponse;
    let { errorMessage, nextPage } = reposResponse;

    userRepos.push(...data);

    while (nextPage) {
      // eslint-disable-next-line no-await-in-loop
      const nextReposResponse = await fetchUserReposPage(login, nextPage);
      const {
        data: nextData,
        errorMessage: nextErrorMessage,
      } = nextReposResponse;
      userRepos.push(...nextData);
      errorMessage = nextErrorMessage;
      nextPage = nextReposResponse.nextPage;
    }

    const mostPopularUserRepos = userRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);

    return {
      data: mostPopularUserRepos || [],
      error: errorMessage || null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error: error.message,
    };
  }
}
