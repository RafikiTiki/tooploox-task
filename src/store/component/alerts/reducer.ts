import { Map, List, fromJS } from 'immutable';
import { Reducer } from 'redux';
import { AlertRecordInterface } from './models';
import { Action } from '../../types';
import * as AlertsConstants from './constants';

export interface AlertsState extends Map<string, any> {
  alerts: List<AlertRecordInterface>;
}

const initialState: AlertsState = fromJS({
  alerts: [],
});

export const alertsReducer: Reducer<AlertsState, Action> = (
  state: AlertsState = initialState,
  action: Action,
): AlertsState => {
  switch (action.type) {
    case AlertsConstants.onAddAlert: {
      const { alert } = action.payload;
      return <AlertsState>(
        state.update('alerts', (alerts) => alerts.push(alert))
      );
    }
    default: {
      return state;
    }
  }
};
