import { createSelector } from 'reselect';
import { domain as RepositoriesDomain } from './constants';
import { RootState } from '../../index';
import { PopularRepositoriesDataSlice, RepositoriesState } from './reducer';

export const selectRepositoriesDomain = (state: RootState): RepositoriesState =>
  state.get(RepositoriesDomain);

export const selectPopularRepositories = createSelector(
  selectRepositoriesDomain,
  (domain) => domain.get('popularRepositories') as PopularRepositoriesDataSlice,
);
