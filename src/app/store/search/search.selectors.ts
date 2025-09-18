import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './search.state';

export const selectAppState = createFeatureSelector<AppState>('search'); 

export const selectSearchQuery = createSelector(
  selectAppState,
  (state: AppState) => state.searchQuery
);