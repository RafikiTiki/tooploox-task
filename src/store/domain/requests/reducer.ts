import { fromJS, Map as ImmutableMap } from 'immutable';
import RequestStatus from './requestStatus';
import { Action } from '../../types';
import { onSetRequestNextPage, onSetRequestStatus } from './constants';

export type RequestStatusMap = ImmutableMap<string, RequestStatus>;

export type RequestNextPageMap = ImmutableMap<string, string>;

export interface RequestsState extends ImmutableMap<string, any> {
  requestStatus: RequestStatusMap;
  requestNextPage: RequestNextPageMap;
}

const initialState: RequestsState = fromJS({
  requestStatus: {},
  requestNextPage: {},
});

export const requestsReducer = (
  state: RequestsState = initialState,
  action: Action,
): RequestsState => {
  switch (action.type) {
    case onSetRequestStatus: {
      const { requestType, status } = action.payload;
      return <RequestsState>state.setIn(['requestStatus', requestType], status);
    }

    case onSetRequestNextPage: {
      const { requestType, nextPage } = action.payload;
      return <RequestsState>(
        state.setIn(['requestNextPage', requestType], nextPage)
      );
    }

    default: {
      return state;
    }
  }
};
