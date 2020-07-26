import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GithubRepo, GithubUser } from '../../../api/types';
import { Maybe } from '../../../commonTypes';
import styles from './styles.module.css';
import { SearchUsersLoader } from '../../loaders';
import EmptyUsersListPlaceholder from '../../EmptyUsersListPlaceholder';
import { fetchUserData, fetchUserRepos } from '../../../api';

const UserInfo: React.FC = () => {
  const { login } = useParams();

  const [userData, onSetUserData] = useState<Maybe<GithubUser>>(null);
  const [isGetUserLoading, onSetIsGetUserLoading] = useState(false);

  const onFetchUserData = useCallback(async () => {
    onSetIsGetUserLoading(true);
    const result = await fetchUserData(login);
    onSetUserData(result.data);
    onSetIsGetUserLoading(false);
  }, [login]);

  const [reposData, onSetReposData] = useState<GithubRepo[]>([]);
  const [isGetUserReposLoading, onSetIsGetUserReposLoading] = useState(false);

  const onFetchUserReposData = useCallback(async () => {
    onSetIsGetUserReposLoading(true);
    const result = await fetchUserRepos(login);
    onSetReposData(result.data);
    onSetIsGetUserReposLoading(false);
  }, [login]);

  useEffect(() => {
    onFetchUserData();
    onFetchUserReposData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onFetchUserData();
    onFetchUserReposData();
  }, [onFetchUserData, onFetchUserReposData]);

  if (isGetUserLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <SearchUsersLoader />
      </div>
    );
  }

  if (userData === null) {
    return <EmptyUsersListPlaceholder />;
  }

  const [firstName, lastName] = userData.name.split(' ');

  return (
    <div className={styles.userInfoWrapper}>
      <div className={styles.userInfoHeader}>
        <img
          className={styles.userAvatar}
          alt="User avatar"
          src={userData.avatar_url}
        />
        <div>
          <span className={styles.headingText}>{firstName}</span>
          <br />
          <span className={styles.headingText}>{lastName}</span>
        </div>
      </div>
      {userData.bio && <p className={styles.userBio}>{userData.bio}</p>}
      <span className={styles.headingText}>Top repositories</span>
      {isGetUserReposLoading ? (
        <div className={styles.loaderWrapper}>
          <SearchUsersLoader />
        </div>
      ) : (
        <ul className={styles.userReposList}>
          {reposData.map((repo) => (
            <li key={repo.id} className={styles.repoItem}>
              <a className={styles.repoLink} href={repo.html_url}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
