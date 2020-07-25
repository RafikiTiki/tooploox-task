import React from 'react';
import styles from './styles.module.css';

const EmptyUsersListPlaceholder: React.FC = () => {
  return (
    <div className={styles.placeholderWrapper}>
      <span>No users data to display</span>
    </div>
  );
};

export default EmptyUsersListPlaceholder;
