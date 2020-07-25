import React, { useCallback } from 'react';
import styles from './styles.module.css';
import { GithubUserBaseData } from '../../api/types';

type PropTypes = {
  user: GithubUserBaseData;
  onClickRow: (userId: number) => void;
};

const GithubUserRow: React.FC<PropTypes> = ({ user, onClickRow }) => {
  const onClick = useCallback(() => {
    onClickRow(user.id);
  }, [user.id, onClickRow]);
  return (
    <li>
      <button className={styles.userRow} type="button" onClick={onClick}>
        <img
          className={styles.userAvatar}
          alt="User Avatar"
          src={user.avatar_url}
        />
        <span>{user.login}</span>
      </button>
    </li>
  );
};

export default GithubUserRow;
