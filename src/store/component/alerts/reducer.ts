import { Map, fromJS } from 'immutable';
import { Reducer } from 'redux';
import { AlertRecordInterface } from './models';
import { Action } from '../../types';
import * as AlertsConstants from './constants';

export type AlertsSlice = Map<string, AlertRecordInterface>;

export interface AlertsState extends Map<string, any> {
  alerts: AlertsSlice;
}

const initialState: AlertsState = fromJS({
  alerts: {},
});

export const alertsReducer: Reducer<AlertsState, Action> = (
  state: AlertsState = initialState,
  action: Action,
): AlertsState => {
  switch (action.type) {
    case AlertsConstants.onAddAlert: {
      const { alert } = action.payload;

      return state.setIn(['alerts', alert.id], alert);
    }

    case AlertsConstants.onRemoveAlert: {
      const { alertId } = action.payload;
      return state.deleteIn(['alerts', alertId]);
    }
    default: {
      return state;
    }
  }
};
