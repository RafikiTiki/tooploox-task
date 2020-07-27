import { Links } from 'parse-link-header';
import { Maybe } from '../commonTypes';

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
};

export interface GithubUserBaseDataInterface {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GithubUserInterface extends GithubUserBaseDataInterface {
  name?: string;
  bio?: string;
}

export type GithubApiResponse<T> = {
  data: T;
  error?: string | null;
  nextPage?: string;
};

export type FetchPageableUserRepos = {
  data: GithubRepo[];
  errorMessage?: string;
  nextPage?: string;
};
