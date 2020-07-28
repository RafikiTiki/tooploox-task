import React from 'react';
import useTypedSelector from '../../store/useTypedSelector';
import { selectAlertIds } from '../../store/component/alerts/selectors';
import styles from './styles.module.css';
import Alert from '../Alert';

const AlertsList: React.FC = () => {
  const alertIds = useTypedSelector((state) => selectAlertIds(state));

  return (
    <div className={styles.alertsContainer}>
      <ul className={styles.alertsList}>
        {alertIds.map((alertId) => (
          <Alert alertId={alertId} />
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
