// src/app/store/review.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Review } from '../../models/Review';
import * as ReviewActions from './review.action';
export interface ReviewState {
  reviews: Review[];
}

export const initialState: ReviewState = {
  reviews: []
};


export const reviewReducer = createReducer(
  initialState,
  on(ReviewActions.addReview, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews, review]
  })),
  on(ReviewActions.updateReview, (state, { review }) => ({
    ...state,
    reviews: [...state.reviews.filter(r =>
      r.id !== review.id), review]
  })),
  on(ReviewActions.deleteReview, (state, { id }) => ({
    ...state,
    reviews: state.reviews.filter(r => r.id !== id)
  }))
);
