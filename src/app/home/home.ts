import { Component, ElementRef, Renderer2, resource, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShowResponse } from '../../models/ShowResponse';
import { MatCard, MatCardImage, MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatGridList, MatGridTile, MatGridTileText } from "@angular/material/grid-list";
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { StarRating } from "../star-rating/star-rating";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, MatCardModule, MatCard, MatToolbar, MatCardImage, MatIcon, MatFormField, MatInput,
     MatToolbarRow, StarRating,MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
 
  searchForm: FormGroup;
  shows = signal<ShowResponse[]>([]);
  queryString = signal<string>('');

  constructor(private showService: ShowService,private router: Router) { 
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });
   this.searchForm.setValue({query: this.queryString() });

  }
searching  = signal(false);
  search(): void {
    this.queryString.set(this.searchForm.get('query')?.value);
    if (this.queryString().length > 0) {

      this.searching.set(true);

      this.showService.getShows(this.queryString()) .pipe(delay(1000)).subscribe(shows => {
        this.shows.set(shows);
        this.searching.set(false);

      });
    }
  
  }
  details(id:number): void {
this.router.navigate(['/details', id]);
  }
}


