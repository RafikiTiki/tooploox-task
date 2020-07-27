import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { GithubUserBaseDataInterface } from '../../api/types';

type PropTypes = {
  user: GithubUserBaseDataInterface;
};

const GithubUserRow: React.FC<PropTypes> = ({ user }) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/user/${user.login}`);
  };
  return (
    <button className={styles.userRow} type="button" onClick={onClick}>
      <img
        className={styles.userAvatar}
        alt="User Avatar"
        src={user.avatar_url}
      />
      <span>{user.login}</span>
    </button>
  );
};

export default GithubUserRow;
