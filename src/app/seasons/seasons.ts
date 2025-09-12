import { Component, Inject, Input, input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Season } from '../../models/Season';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule, MatListItem } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { Episodes } from "../episodes/episodes";
@Component({
  selector: 'app-seasons',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatExpansionModule, MatGridListModule, DatePipe, Episodes],
  templateUrl: './seasons.html',
  styleUrls: ['./seasons.css']
})
export class Seasons {
   @Input() showId!: number;
  constructor(private showService: ShowService) { }
  seasons = signal<Season[]>([]);


ngOnInit() {
  this.showService.getShowSeasons(this.showId).subscribe(seasons => {
    this.seasons.set(seasons);
  }); 
}

}