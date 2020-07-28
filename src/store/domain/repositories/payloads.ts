import { List } from 'immutable';
import { GithubRepositoryRecordInterface } from './models';

export type OnFetchUserPopularRepositoriesPayload = {
  login: string;
};

export type OnSetUserPopularRepositoriesPayload = {
  repositories: List<GithubRepositoryRecordInterface>;
};
