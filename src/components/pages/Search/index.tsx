import React from 'react';
import GithubUsersList from '../../GithubUsersList';
import styles from './styles.module.css';
import { useSearchComponent } from './hook';

const Search: React.FC = () => {
  const {
    hasNextPage,
    isLoading,
    onFetchMoreUsersData,
    usersData,
  } = useSearchComponent();

  return (
    <div className={styles.searchResultsWrapper}>
      <GithubUsersList
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        users={usersData}
        onFetchMoreUsersData={onFetchMoreUsersData}
      />
    </div>
  );
};

export default Search;
