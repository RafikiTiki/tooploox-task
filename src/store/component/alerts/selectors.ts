import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
import { domain as AlertsDomain } from './constants';
import { RootState } from '../../index';
import { AlertsSlice } from './reducer';

export const selectAlertsDomain = (state: RootState) => state.get(AlertsDomain);

export const selectAlertsData = createSelector(
  selectAlertsDomain,
  (domain) => domain.get('alerts') as AlertsSlice,
);

export const selectAlertIds = createSelector(selectAlertsData, (alertsData) =>
  alertsData.keySeq().toList(),
);

// args: alertId
export const selectAlert = createCachedSelector(
  selectAlertsData,
  (_: RootState, alertId: string) => alertId,
  (alertsData, alertId) => alertsData.get(alertId),
)((_, alertId) => alertId);
