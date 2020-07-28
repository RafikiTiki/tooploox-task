import { takeEvery, put } from 'redux-saga/effects';
import * as RequestsConstants from './constants';
import { Action } from '../../types';
import { OnSetRequestStatusPayload } from './payloads';
import RequestStatus from './requestStatus';
import { Alert } from '../../component/alerts/models';
import { AlertType } from '../../component/alerts/types';
import { generateId } from '../../../utils';
import { onAddAlert } from '../../component/alerts/actions';
import getMessageFromRequestError from './getMessageFromRequestError';

export function* onSetRequestStatus({
  payload: { error, status, requestType },
}: Action<OnSetRequestStatusPayload>) {
  try {
    if (status === RequestStatus.FAILURE) {
      const alertMessage = getMessageFromRequestError(
        requestType,
        error?.message,
      );

      if (alertMessage) {
        const alert = Alert({
          id: generateId(),
          type: AlertType.ERROR,
          message: alertMessage,
        });

        yield put(onAddAlert(alert));
      }
    }
  } catch (internalError) {
    console.error(internalError);
  }
}

export function* requestsSaga() {
  yield takeEvery(RequestsConstants.onSetRequestStatus, onSetRequestStatus);
}
