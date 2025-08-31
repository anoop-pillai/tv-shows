import { CommonModule } from '@angular/common';
import { Component, Input, TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRating {

  @Input() rating: number = 0; // Rating out of 10

  get starStates(): ('full' | 'half' | 'empty')[] {
    const fiveStarRating = this.rating / 2;
    const states: ('full' | 'half' | 'empty')[] = [];

    for (let i = 1; i <= 5; i++) {
      if (fiveStarRating >= i) {
        states.push('full');
      } else if (fiveStarRating >= i - 0.5) {
        states.push('half');
      } else {
        states.push('empty');
      }
    }

    return states;
  }

}