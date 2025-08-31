import { Component, Inject, Input, input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Season } from '../../models/Season';
import { MatCardModule } from '@angular/material/card';
import { MatGridList } from "@angular/material/grid-list";
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-seasons',
  imports: [MatCardModule, MatGridList,MatListItem],
  templateUrl: './seasons.html',
  styleUrl: './seasons.css'
})
export class Seasons {
   @Input() showId!: number;
  constructor(private showService: ShowService) { }
  seasons = signal<Season[]>([]);


ngOnInit() {
   console.log("Loading seasons for show ID:", this.showId);
  this.showService.getShowSeasons(this.showId).subscribe(seasons => {
    this.seasons.set(seasons);
  }); 
}

}