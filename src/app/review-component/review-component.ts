import { Component, Input, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReviewsByShowId } from '../store/review.selector';
import { Review } from '../../models/Review';
import * as ReviewActions from '../store/review.action';


import { v4 as uuidv4 } from 'uuid';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { StarRating } from "../star-rating/star-rating";
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';


@Component({
  selector: 'app-review-component',
  templateUrl: './review-component.html',
  imports: [ReactiveFormsModule, StarRating, MatIcon, DatePipe, MatButton, MatError],
  styleUrl: './review-component.css'
})
export class ReviewComponent {
  @Input() showId!: number;

 reviewForm: FormGroup;

  reviews= signal<Review[]>([]);
  review = signal<Review | null>(null);
  isEditing = signal(false);
  constructor(private store: Store) {
    this.reviewForm = new FormGroup({
      rating: new FormControl('',Validators.required),
      comment: new FormControl('',[Validators.required,Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.store.select(selectReviewsByShowId(this.showId)).subscribe(reviews => {
      this.reviews.set(reviews);
    });
  }

  addReview() {
    if(this.reviewForm.valid){


    if (!this.isEditing()) {  
       this.review.set( {
      id: uuidv4(),
      showId: this.showId,
      rating: this.reviewForm.get('rating')?.value,
      comment:this.reviewForm.get('comment')?.value,
      createdAt: new Date()
    });

      this.store.dispatch(ReviewActions.addReview({ review: this.review()! }));
    }else if (this.isEditing()) {
      
      const currentReview = this.review();
      if (currentReview) {
        this.store.dispatch(ReviewActions.updateReview({  review: {
            id: currentReview.id,
            showId: this.showId,
            rating: this.reviewForm.get('rating')?.value,
            comment: this.reviewForm.get('comment')?.value,
            createdAt:new Date()
          }
        }));
      }
      this.isEditing.set(false);
      this.review.set(null);
    }this.reviewForm.reset();
        }

    
  }

  deleteReview(reviewId: string) {
    this.store.dispatch({ type: '[Review] Delete', id: reviewId });
  }
  editReview(review: Review) {
    this.isEditing.set(true);
    this.review.set(review);
    this.reviewForm.setValue({
      rating: review.rating,
      comment: review.comment
    });
  }
  cancelEdit() {
    this.isEditing.set(false);
    this.review.set(null);
    this.reviewForm.reset();
  }
}
