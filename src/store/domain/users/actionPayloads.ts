import { Map, List } from 'immutable';
import {
  GithubUserInterface,
  GithubUserBaseDataInterface,
} from '../../../api/types';

export type OnSearchUsersPayload = {
  searchPhrase: string;
  isInitialSearch?: boolean;
};

export type OnBatchUsersBaseDataPayload = {
  users: Map<number, GithubUserBaseDataInterface>;
  userIds: List<number>;
  isInitialBatch?: boolean;
};

export type onSetSelectedUserDataPayload = {
  user: GithubUserInterface;
};

export type OnFetchUserDetailsPayload = {
  login: string;
};
