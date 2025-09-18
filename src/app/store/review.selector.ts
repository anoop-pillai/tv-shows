import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Review } from '../../models/Review';
import { ReviewState } from './review.reducer';

export const selectReviewState = createFeatureSelector<ReviewState>('reviews');


export const selectReviewsByShowId = (showId: number) =>
  createSelector(selectReviewState, (state: ReviewState) =>
    state.reviews.filter(review => review.showId === showId)
  );

export const deleteReview = (reviewId:string) =>
  createSelector(selectReviewState, (state: ReviewState) =>
    state.reviews.filter(review => review.id !== reviewId)
  );