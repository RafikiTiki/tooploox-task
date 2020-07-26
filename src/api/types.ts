import { Links } from 'parse-link-header';
import { Maybe } from '../commonTypes';

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
};

export interface GithubUserBaseData {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GithubUser extends GithubUserBaseData {
  name: string;
  bio: string;
}

export type GithubApiResponse<T> = {
  data: T;
  error: string | null;
};

export type FetchPageableUserRepos = {
  data: GithubRepo[];
  errorMessage?: string;
  nextPage?: string;
};
