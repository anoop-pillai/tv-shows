import { Component, Inject, Input, input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Season } from '../../models/Season';
import { MatCardModule } from '@angular/material/card';
import { MatGridList } from "@angular/material/grid-list";
import { MatList, MatListItem } from '@angular/material/list';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seasons',
  imports: [MatCardModule,MatListItem,DatePipe],
  templateUrl: './seasons.html',
  styleUrl: './seasons.css'
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