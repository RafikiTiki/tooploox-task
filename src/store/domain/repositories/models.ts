import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { GithubRepoInterface } from '../../../api/types';

const defaultRepositoryData: GithubRepoInterface = {
  id: 0,
  name: '',
  html_url: '',
  stargazers_count: 0,
};

export interface GithubRepositoryRecordInterface
  extends TypedRecord<GithubRepositoryRecordInterface>,
    GithubRepoInterface {}

export const GithubRepo = makeTypedFactory<
  GithubRepoInterface,
  GithubRepositoryRecordInterface
>(defaultRepositoryData);
