import { Component, Input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Episode } from '../../models/Episode';
import { MatCard, MatCardModule } from "@angular/material/card";
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-episodes',
  imports: [MatCard, MatPaginator, MatCardModule],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css'
})
export class Episodes {
constructor(private showService: ShowService) { }

@Input() seasonId!: number;
paginatedEpisodes = signal<Episode[]>([]);

  pageSize = 5;
  currentPage = 0;

@Input() showId!: number;
episodes = signal<Episode[]>([]);

ngOnInit() {
  if(this.seasonId){
  this.showService.getSeasonEpisodes(this.seasonId).subscribe(episodes => {
    this.episodes.set(episodes); 
     this.updatePaginatedItems();
  });
  }else{
    this.showService.getEpisodes(this.showId).subscribe(episodes => {
    this.episodes.set(episodes); 
     this.updatePaginatedItems();
  });
  }
  

}

updatePaginatedItems() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEpisodes.set(this.episodes().slice(start, end));
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }

}
