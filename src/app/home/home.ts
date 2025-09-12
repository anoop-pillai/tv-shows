import { Component, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShowResponse } from '../../models/ShowResponse';
import { MatCard, MatCardImage, MatCardModule } from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { StarRating } from '../star-rating/star-rating';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../store/search/search.state';
import * as SearchActions from '../store/search/search.actions';
import * as SearchSelectors from '../store/search/search.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatCard,
    MatToolbar,
    MatCardImage,
    MatIcon,
    MatFormField,
    MatInput,
    MatToolbarRow,
    StarRating,
    MatProgressSpinnerModule
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchForm: FormGroup;
  shows = signal<ShowResponse[]>([]);
  queryString = signal<string>('');
  searching = signal(false);
  searchQuery$: Observable<string>;

  ngOnInit(): void {
    this.searchForm.setValue({ query: this.queryString() });
  }
  constructor(private showService: ShowService, private router: Router,private store: Store<AppState>) {
    this.searchForm = new FormGroup({
      query: new FormControl(''),
    });
        this.searchQuery$ = this.store.select(SearchSelectors.selectSearchQuery);
        this.searchQuery$.subscribe(query => {
          this.queryString.set(query);
          if (this.queryString().length > 0) {
            this.searchForm.setValue({ query: this.queryString() });
            this.search();
          }
        });

  }

  search(): void {
    this.queryString.set(this.searchForm.get('query')?.value);
    if (this.queryString().length > 0) {
      this.searching.set(true);
      this.store.dispatch(SearchActions.updateSearchQuery({ query: this.queryString() }));


      this.showService.getShows(this.queryString()).subscribe((shows) => {
        this.shows.set(shows);
        this.searching.set(false);
      }
      );
    }
  }
  details(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
