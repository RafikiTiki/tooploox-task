import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { useGithubUserBaseData } from './hook';

type PropTypes = {
  userId: number;
};

const GithubUserRow: React.FC<PropTypes> = ({ userId }) => {
  const user = useGithubUserBaseData(userId);
  const history = useHistory();

  if (!user) {
    return null;
  }

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

export default React.memo(GithubUserRow);
