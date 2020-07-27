import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
import { AlertInterface, AlertType } from './types';

const defaultAlert: AlertInterface = {
  id: '',
  type: AlertType.INFO,
  message: '',
};

export interface AlertRecordInterface
  extends TypedRecord<AlertRecordInterface>,
    AlertInterface {}

export const Alert = makeTypedFactory<AlertInterface, AlertRecordInterface>(
  defaultAlert,
);
