import React from 'react';
import { GithubUserBaseData } from '../../api/types';
import GithubUserRow from '../GithubUserRow';
import styles from './styles.module.css';
import EmptyUsersListPlaceholder from '../EmptyUsersListPlaceholder';

type PropTypes = {
  isLoading: boolean;
  users: GithubUserBaseData[];
  onClickRow: (userId: number) => void;
};

const GithubUsersList: React.FC<PropTypes> = ({ users, onClickRow }) => {
  if (users.length === 0) {
    return <EmptyUsersListPlaceholder />;
  }
  return (
    <ul className={styles.usersList}>
      {users.map((user) => (
        <GithubUserRow user={user} key={user.id} onClickRow={onClickRow} />
      ))}
    </ul>
  );
};

export default GithubUsersList;
