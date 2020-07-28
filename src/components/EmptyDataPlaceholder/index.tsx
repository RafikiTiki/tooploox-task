import React from 'react';
import styles from './styles.module.css';

type PropTypes = {
  dataName: string;
};

const EmptyDataPlaceholder: React.FC<PropTypes> = ({ dataName }) => {
  return (
    <div className={styles.placeholderWrapper}>
      <span>{`No ${dataName} data to display`}</span>
    </div>
  );
};

export default EmptyDataPlaceholder;
