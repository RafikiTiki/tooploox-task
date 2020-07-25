import React, { useCallback, useState } from 'react';
import styles from './styles.module.css';
import Header from '../Header';
import { searchGithubUsers } from '../../api';
import { GithubUserBaseData } from '../../api/types';
import GithubUsersList from '../GithubUsersList';
import { Maybe } from '../../commonTypes';

const App: React.FC = () => {
  const [usersData, onSetUsersData] = useState<GithubUserBaseData[]>([]);
  const [isSearchUsersLoading, onSetIsSearchUserLoading] = useState(false);
  const [selectedUserId, onSetSelectedUserId] = useState<Maybe<number>>(null);

  const onSearch = useCallback(async (searchPhrase: string) => {
    onSetIsSearchUserLoading(true);
    const result = await searchGithubUsers(searchPhrase);
    onSetUsersData(result.data);
    onSetSelectedUserId(null);
    onSetIsSearchUserLoading(false);
  }, []);

  return (
    <div>
      <Header onSearch={onSearch} />
      <div className={styles.content}>
        {selectedUserId ? (
          <span>{selectedUserId}</span>
        ) : (
          <GithubUsersList
            isLoading={isSearchUsersLoading}
            users={usersData}
            onClickRow={onSetSelectedUserId}
          />
        )}
      </div>
    </div>
  );
};

export default App;
