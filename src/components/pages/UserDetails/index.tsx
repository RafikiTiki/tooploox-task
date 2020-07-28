import React from 'react';
import styles from './styles.module.css';
import { SearchUsersLoader } from '../../loaders';
import EmptyDataPlaceholder from '../../EmptyDataPlaceholder';
import { getUserFirstAndLastName } from '../../../utils';
import { useUserDetails } from './hook';

const UserDetails: React.FC = () => {
  const {
    isFetchUserDataLoading,
    isFetchUserDataFinished,
    isFetchUserReposLoading,
    popularRepos,
    user,
  } = useUserDetails();

  if (isFetchUserDataLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <SearchUsersLoader />
      </div>
    );
  }

  if (user === null) {
    return isFetchUserDataFinished ? (
      <EmptyDataPlaceholder dataName="user" />
    ) : null;
  }

  const { firstName, lastName } = getUserFirstAndLastName(user.name);

  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.userInfoHeader}>
        <img
          className={styles.userAvatar}
          alt="User avatar"
          src={user.avatar_url}
        />
        <div>
          <span className={styles.headingText}>{firstName}</span>
          <br />
          <span className={styles.headingText}>{lastName}</span>
        </div>
      </div>
      {user.bio && <p className={styles.userBio}>{user.bio}</p>}
      <span className={styles.headingText}>Top repositories</span>
      {isFetchUserReposLoading ? (
        <div className={styles.loaderWrapper}>
          <SearchUsersLoader />
        </div>
      ) : (
        <ul className={styles.userReposList}>
          {popularRepos.map((repo) => (
            <li key={repo.id} className={styles.repoItem}>
              <a
                className={styles.repoLink}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
