import { createSelector } from 'reselect';
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

export const selectRequestStatus = createSelector(
  selectRequestStatusDomain,
  (_: RootState, args: { requestType: RequestType }) => args.requestType,
  (requestStatusMap, requestType) => requestStatusMap.get(requestType),
);

// args: requestType
export const selectIsRequestLoading = createSelector(
  selectRequestStatus,
  (requestStatus) => requestStatus === RequestStatus.LOADING,
);

// args: requestType
export const selectRequestNextPage = createSelector(
  selectRequestNextPageDomain,
  (_: RootState, args: { requestType: RequestType }) => args.requestType,
  (requestNextPageDomain, requestType) =>
    requestNextPageDomain.get(requestType),
);
