import { createAction, props } from '@ngrx/store';

export const updateSearchQuery = createAction(
  '[Search] Update Search Query',
  props<{ query: string }>()
);