import { List } from 'immutable';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { GithubUserRecordInterface } from '../../../store/domain/users/models';
import { GithubRepositoryRecordInterface } from '../../../store/domain/repositories/models';
import useTypedSelector from '../../../store/useTypedSelector';
import { selectIsRequestLoading } from '../../../store/domain/requests/selectors';
import RequestType from '../../../store/domain/requests/requestType';
import { selectSelectedUserData } from '../../../store/domain/users/selectors';
import { selectPopularRepositories } from '../../../store/domain/repositories/selectors';
import { onFetchUserDetails } from '../../../store/domain/users/actions';
import { Maybe } from '../../../commonTypes';

export type UserDetailsHook = {
  isFetchUserDataLoading: boolean;
  isFetchUserReposLoading: boolean;
  user: Maybe<GithubUserRecordInterface>;
  popularRepos: List<GithubRepositoryRecordInterface>;
};

export const useUserDetails = (): UserDetailsHook => {
  const isFetchUserDataLoading = useTypedSelector((state) =>
    selectIsRequestLoading(state, RequestType.FETCH_USER_DATA),
  );
  const isFetchUserReposLoading = useTypedSelector((state) =>
    selectIsRequestLoading(state, RequestType.FETCH_USER_POPULAR_REPOS),
  );
  const user = useTypedSelector((state) => selectSelectedUserData(state));
  const popularRepos = useTypedSelector((state) =>
    selectPopularRepositories(state),
  );

  const { login } = useParams();
  const dispatch = useDispatch();
  const onFetchUserDataAndPopularRepos = useCallback(
    (username: string) => {
      dispatch(onFetchUserDetails({ login: username }));
    },
    [dispatch],
  );

  useEffect(() => {
    onFetchUserDataAndPopularRepos(login);
  }, [login]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isFetchUserDataLoading,
    isFetchUserReposLoading,
    user,
    popularRepos,
  };
};
