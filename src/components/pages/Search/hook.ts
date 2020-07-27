import { useCallback, useEffect } from 'react';
import { List } from 'immutable';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../store/useTypedSelector';
import { UserBaseDataRecordInterface } from '../../../store/domain/users/models';
import {
  selectIsRequestLoading,
  selectRequestNextPage,
} from '../../../store/domain/requests/selectors';
import RequestType from '../../../store/domain/requests/requestType';
import { selectSearchUsersData } from '../../../store/domain/users/selectors';
import { onSearchUsers } from '../../../store/domain/users/actions';

export type SearchHook = {
  isLoading: boolean;
  hasNextPage: boolean;
  usersData: List<UserBaseDataRecordInterface>;
  onFetchMoreUsersData: VoidFunction;
};

export const useSearchComponent = (): SearchHook => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const isLoading = useTypedSelector((state) =>
    selectIsRequestLoading(state, RequestType.SEARCH_USERS),
  );
  const nextPage = useTypedSelector((state) =>
    selectRequestNextPage(state, RequestType.SEARCH_USERS),
  );
  const usersData = useTypedSelector((state) => selectSearchUsersData(state));

  const onFetchMoreUsersData = useCallback(async () => {
    dispatch(onSearchUsers({ searchPhrase, isInitialSearch: false }));
  }, [dispatch, searchPhrase]);

  const onSearch = useCallback(
    async (query) => {
      dispatch(onSearchUsers({ searchPhrase: query, isInitialSearch: true }));
    },
    [dispatch],
  );

  useEffect(() => {
    onSearch(searchPhrase);
  }, [searchPhrase]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isLoading,
    hasNextPage: !!nextPage,
    usersData,
    onFetchMoreUsersData,
  };
};
