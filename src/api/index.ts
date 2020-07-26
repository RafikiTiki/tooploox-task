import {
  GithubApiResponse,
  GithubRepo,
  GithubUser,
  GithubUserBaseData,
} from './types';
import { Maybe } from '../commonTypes';

const API_ROOT = 'https://api.github.com';

export async function searchGithubUsers(
  searchPhrase: string,
): Promise<GithubApiResponse<GithubUserBaseData[]>> {
  try {
    const query = encodeURIComponent(`${searchPhrase} in:fullname`);
    const response = await fetch(`${API_ROOT}/search/users?q=${query}`);
    const data = await response.json();

    return {
      data: data.items || [],
      error: data.message || null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.message,
    };
  }
}

export async function fetchUserData(
  login: string,
): Promise<GithubApiResponse<Maybe<GithubUser>>> {
  try {
    const username = encodeURIComponent(login);
    const response = await fetch(`${API_ROOT}/users/${username}`);
    const data = await response.json();

    return {
      data: data || null,
      error: data.message || null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
}

export async function fetchUserRepos(
  login: string,
): Promise<GithubApiResponse<GithubRepo[]>> {
  try {
    const username = encodeURIComponent(login);
    const response = await fetch(`${API_ROOT}/users/${username}/repos`);
    const data = await response.json();

    return {
      data: data || [],
      error: data.message || null,
    };
  } catch (error) {
    return {
      data: [],
      error: error.message,
    };
  }
}
