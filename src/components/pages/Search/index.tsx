import React from 'react';
import GithubUsersList from '../../GithubUsersList';
import styles from './styles.module.css';
import { useSearchComponent } from './hook';

const Search: React.FC = () => {
  const {
    hasNextPage,
    isLoading,
    isRequestFinished,
    userIds,
    onFetchMoreUsersData,
  } = useSearchComponent();

  return (
    <div className={styles.searchResultsWrapper}>
      <GithubUsersList
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        isRequestFinished={isRequestFinished}
        userIds={userIds}
        onFetchMoreUsersData={onFetchMoreUsersData}
      />
    </div>
  );
};

export default Search;
