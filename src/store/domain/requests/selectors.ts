import { createSelector } from 'reselect';
import { createCachedSelector } from 're-reselect';
import { domain as RequestsDomain } from './constants';
import { RootState } from '../../index';
import { RequestNextPageMap, RequestsState, RequestStatusMap } from './reducer';
import RequestType from './requestType';
import RequestStatus from './requestStatus';

export const selectRequestsDomain = (state: RootState): RequestsState =>
  state.get(RequestsDomain);

export const selectRequestStatusDomain = createSelector(
  selectRequestsDomain,
  (domain) => domain.get('requestStatus') as RequestStatusMap,
);

export const selectRequestNextPageDomain = createSelector(
  selectRequestsDomain,
  (domain) => domain.get('requestNextPage') as RequestNextPageMap,
);

// args: requestType
export const selectRequestStatus = createCachedSelector(
  selectRequestStatusDomain,
  (_: RootState, requestType: RequestType) => requestType,
  (requestStatusMap, requestType) => requestStatusMap.get(requestType),
)((_, requestType) => requestType);

// args: requestType
export const selectIsRequestLoading = createCachedSelector(
  selectRequestStatus,
  (requestStatus) => requestStatus === RequestStatus.LOADING,
)((_, requestType) => requestType);

// args: requestType
export const selectIsRequestFinished = createCachedSelector(
  selectRequestStatus,
  (requestStatus) =>
    requestStatus === RequestStatus.FAILURE ||
    requestStatus === RequestStatus.SUCCESS,
)((_, requestType) => requestType);

// args: requestType
export const selectRequestNextPage = createCachedSelector(
  selectRequestNextPageDomain,
  (_: RootState, requestType: RequestType) => requestType,
  (requestNextPageDomain, requestType) =>
    requestNextPageDomain.get(requestType),
)((_, requestType) => requestType);
