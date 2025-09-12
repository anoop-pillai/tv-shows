import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";

import { StoreModule } from '@ngrx/store';
import { reviewReducer } from './store/review.reducer';
import { EffectsModule } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tv-shows');
}
