import { useCallback, useEffect } from 'react';
import { List } from 'immutable';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../store/useTypedSelector';
import {
  selectIsRequestLoading,
  selectRequestNextPage,
} from '../../../store/domain/requests/selectors';
import RequestType from '../../../store/domain/requests/requestType';
import { selectSearchUserIds } from '../../../store/domain/users/selectors';
import { onSearchUsers } from '../../../store/domain/users/actions';

export type SearchHook = {
  isLoading: boolean;
  hasNextPage: boolean;
  userIds: List<number>;
  onFetchMoreUsersData: VoidFunction;
};

export const useSearchComponent = (): SearchHook => {
  const { searchPhrase } = useParams();

  const isLoading = useTypedSelector((state) =>
    selectIsRequestLoading(state, RequestType.SEARCH_USERS),
  );
  const nextPage = useTypedSelector((state) =>
    selectRequestNextPage(state, RequestType.SEARCH_USERS),
  );
  const userIds = useTypedSelector((state) => selectSearchUserIds(state));

  const dispatch = useDispatch();
  const onFetchMoreUsersData = useCallback(() => {
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
    userIds,
    onFetchMoreUsersData,
  };
};
