import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { GithubUserInterface } from '../../../api/types';

export const defaultGithubUserData: GithubUserInterface = {
  id: 0,
  login: '',
  avatar_url: '',
  name: '',
  bio: '',
};

export interface GithubUserRecordInterface
  extends TypedRecord<GithubUserRecordInterface>,
    GithubUserInterface {}

export const GithubUser = makeTypedFactory<
  GithubUserInterface,
  GithubUserRecordInterface
>(defaultGithubUserData);
