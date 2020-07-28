import * as RequestConstants from './constants';
import RequestType from './requestType';
import RequestStatus from './requestStatus';
import createAction from '../../createAction';
import { OnSetRequestNextPage, OnSetRequestStatusPayload } from './payloads';
import { Action } from '../../types';

export const onSetRequestStatus = (
  requestType: RequestType,
  status: RequestStatus,
  error?: Error,
): Action<OnSetRequestStatusPayload> =>
  createAction(RequestConstants.onSetRequestStatus, {
    requestType,
    status,
    error,
  });

export const onSetRequestNextPage = (
  requestType: RequestType,
  nextPage: string,
): Action<OnSetRequestNextPage> =>
  createAction(RequestConstants.onSetRequestNextPage, {
    requestType,
    nextPage,
  });
