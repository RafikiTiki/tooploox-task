import { AlertRecordInterface } from './models';
import createAction from '../../createAction';
import * as alertConstants from './constants';

export const onAddAlert = (alert: AlertRecordInterface) =>
  createAction(alertConstants.onAddAlert, { alert });

export const onRemoveAlert = (alertId: string) =>
  createAction(alertConstants.onRemoveAlert, { alertId });
