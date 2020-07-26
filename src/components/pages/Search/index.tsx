import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GithubUserBaseData } from '../../../api/types';
import { searchGithubUsers } from '../../../api';
import GithubUsersList from '../../GithubUsersList';
import styles from './styles.module.css';

const Search: React.FC = () => {
  const { searchPhrase } = useParams();
  const [usersData, onSetUsersData] = useState<GithubUserBaseData[]>([]);
  const [nextPage, onSetNextPage] = useState<string | undefined>(undefined);
  const [isSearchUsersLoading, onSetIsSearchUserLoading] = useState(false);
  const [isLoadingNextPage, onSetIsLoadingNextPage] = useState(false);

  const onFetchMoreUsersData = useCallback(async () => {
    if (nextPage) {
      onSetIsLoadingNextPage(true);
      const { data, nextPage: newNextPage } = await searchGithubUsers(
        searchPhrase,
        nextPage,
      );
      onSetNextPage(newNextPage);
      onSetUsersData((currentUsersData) => [...currentUsersData, ...data]);
      onSetIsLoadingNextPage(false);
    }
  }, [nextPage, searchPhrase]);

  const onSearch = useCallback(async (query) => {
    onSetIsSearchUserLoading(true);
    const { data, nextPage: newNextPage } = await searchGithubUsers(query);
    onSetUsersData(data);
    onSetNextPage(newNextPage);
    onSetIsSearchUserLoading(false);
  }, []);

  useEffect(() => {
    onSearch(searchPhrase);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onSearch(searchPhrase);
  }, [searchPhrase]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.searchResultsWrapper}>
      <GithubUsersList
        hasNextPage={!!nextPage}
        isLoadingNextPage={isLoadingNextPage}
        isLoading={isSearchUsersLoading}
        users={usersData}
        onFetchMoreUsersData={onFetchMoreUsersData}
      />
    </div>
  );
};

export default Search;
