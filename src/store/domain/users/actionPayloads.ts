import { Map } from 'immutable';
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
  isInitialBatch?: boolean;
};

export type OnSetSelectedUserPayload = {
  user: GithubUserInterface;
};

export type OnFetchUserDetailsPayload = {
  login: string;
};
