import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,InfiniteScrollModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tv-shows');
}
