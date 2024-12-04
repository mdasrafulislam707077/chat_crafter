import { createSelector,createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../store';
export const selectAppState = createFeatureSelector<AppState>('botinfo');
export const selectBotInfo = createSelector(
  selectAppState,
  (state:any) => state
);
