import { Component, Input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Episode } from '../../models/Episode';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-episodes',
  imports: [MatCard],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css'
})
export class Episodes {
constructor(private showService: ShowService) { }
@Input() showId!: number;
episodes = signal<Episode[]>([]);
ngOnInit() {
  this.showService.getEpisodes(this.showId).subscribe(episodes => {
    this.episodes.set(episodes);
  });
}

}
