import React, { useCallback } from 'react';
import useTypedSelector from '../../store/useTypedSelector';
import { selectAlert } from '../../store/component/alerts/selectors';
import { useDispatch } from 'react-redux';
import { onRemoveAlert } from '../../store/component/alerts/actions';
import xIcon from './x_icon.svg';
import styles from './styles.module.css';

export type PropTypes = {
  alertId: string;
};

const Alert: React.FC<PropTypes> = ({ alertId }) => {
  const alert = useTypedSelector((state) => selectAlert(state, alertId));
  const dispatch = useDispatch();
  const onCloseAlert = useCallback(() => {
    dispatch(onRemoveAlert(alertId));
  }, [alertId, dispatch]);

  return (
    <li className={styles.alert}>
      <span className={styles.alertMessage}>{alert?.message}</span>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onCloseAlert}>
        <img src={xIcon} alt="close icon" className={styles.closeIcon} />
      </button>
    </li>
  );
};

export default Alert;
