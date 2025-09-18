import { createReducer, on } from '@ngrx/store';
import { initialAppState } from './search.state';
import * as SearchActions from './search.actions';

export const searchReducer = createReducer(
  initialAppState,
  on(SearchActions.updateSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  }))
);