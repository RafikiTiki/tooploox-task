import { fromJS, List } from 'immutable';
import { GithubRepositoryRecordInterface } from './models';
import { Reducer } from 'redux';
import { Action } from '../../types';
import * as RepositoriesConstants from './constants';
import { OnSetUserPopularRepositoriesPayload } from './payloads';

export type PopularRepositoriesDataSlice = List<
  GithubRepositoryRecordInterface
>;

export interface RepositoriesState extends Map<string, any> {
  popularRepositories: PopularRepositoriesDataSlice;
}

const initialState: RepositoriesState = fromJS({
  popularRepositories: [],
});

export const repositoriesReducer: Reducer<RepositoriesState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case RepositoriesConstants.onSetUserPopularRepositories: {
      const {
        payload: { repositories },
      }: Action<OnSetUserPopularRepositoriesPayload> = action;
      return state.set('popularRepositories', repositories);
    }

    default: {
      return state;
    }
  }
};
