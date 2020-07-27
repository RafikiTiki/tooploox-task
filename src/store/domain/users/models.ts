import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import {
  GithubUserInterface,
  GithubUserBaseDataInterface,
} from '../../../api/types';

const defaultUserBaseData: GithubUserBaseDataInterface = {
  id: 0,
  login: '',
  avatar_url: '',
};

export interface UserBaseDataRecordInterface
  extends TypedRecord<UserBaseDataRecordInterface>,
    GithubUserBaseDataInterface {}

export const GithubUserBaseData = makeTypedFactory<
  GithubUserBaseDataInterface,
  UserBaseDataRecordInterface
>(defaultUserBaseData);

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
