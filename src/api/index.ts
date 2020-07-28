import {
  FetchPageableUserRepos,
  GithubApiResponse,
  GithubRepoInterface,
  GithubUserInterface,
  GithubUserBaseDataInterface,
} from './types';
import { Maybe } from '../commonTypes';
import { getNextPage, processResponse } from './utils';

const API_ROOT = 'https://api.github.com';

export async function searchGithubUsers(
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

export async function fetchUserData(
  login: string,
): Promise<GithubApiResponse<Maybe<GithubUserInterface>>> {
  const username = encodeURIComponent(login);
  const response = await fetch(`${API_ROOT}/users/${username}`);
  return processResponse(response);
}

export async function fetchUserReposPage(
  login: string,
  page?: string,
): Promise<FetchPageableUserRepos> {
  const username = encodeURIComponent(login);
  const url = `${API_ROOT}/users/${username}/repos${
    page ? `?page=${page}` : ''
  }`;
  const response = await fetch(url);
  return processResponse(response);
}
