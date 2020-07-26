import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GithubUserBaseData } from '../../../api/types';
import { searchGithubUsers } from '../../../api';
import GithubUsersList from '../../GithubUsersList';

const Search: React.FC = () => {
  const { searchPhrase } = useParams();
  const [usersData, onSetUsersData] = useState<GithubUserBaseData[]>([]);
  const [isSearchUsersLoading, onSetIsSearchUserLoading] = useState(false);

  const onSearch = useCallback(async () => {
    onSetIsSearchUserLoading(true);
    const result = await searchGithubUsers(searchPhrase);
    onSetUsersData(result.data);
    onSetIsSearchUserLoading(false);
  }, [searchPhrase]);

  useEffect(() => {
    onSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <GithubUsersList isLoading={isSearchUsersLoading} users={usersData} />;
};

export default Search;
