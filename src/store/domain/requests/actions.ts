import * as RequestConstants from './constants';
import RequestType from './requestType';
import RequestStatus from './requestStatus';
import createAction from '../../createAction';

export const onSetRequestStatus = (
  requestType: RequestType,
  status: RequestStatus,
  error?: Error,
) =>
  createAction(RequestConstants.onSetRequestStatus, {
    requestType,
    status,
    error,
  });

export const onSetRequestNextPage = (
  requestType: RequestType,
  nextPage: string,
) =>
  createAction(RequestConstants.onSetRequestNextPage, {
    requestType,
    nextPage,
  });
