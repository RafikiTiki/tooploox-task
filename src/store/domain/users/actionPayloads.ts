import { Map, List } from 'immutable';
import { GithubUserInterface } from '../../../api/types';

export type OnSearchUsersPayload = {
  searchPhrase: string;
  isInitialSearch?: boolean;
};

export type OnBatchUsersBaseDataPayload = {
  users: Map<number, GithubUserInterface>;
  userIds: List<number>;
  isInitialBatch?: boolean;
};

export type OnSetSelectedUserDataPayload = {
  user: GithubUserInterface;
};

export type OnFetchUserDetailsPayload = {
  login: string;
};
