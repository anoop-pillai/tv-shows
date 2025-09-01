import { Component, Input, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { Episode } from '../../models/Episode';
import { MatCard } from "@angular/material/card";
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-episodes',
  imports: [MatCard, MatPaginator],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css'
})
export class Episodes {
constructor(private showService: ShowService) { }

paginatedEpisodes = signal<Episode[]>([]);

  pageSize = 5;
  currentPage = 0;

@Input() showId!: number;
episodes = signal<Episode[]>([]);

ngOnInit() {
  this.showService.getEpisodes(this.showId).subscribe(episodes => {
    this.episodes.set(episodes); 
     this.updatePaginatedItems();
  });

}

updatePaginatedItems() {
  console.log("Updating paginated items for page:", this.currentPage, "with page size:", this.pageSize,'total',this.episodes());
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEpisodes.set(this.episodes().slice(start, end));
    console.log("Paginated items:", this.paginatedEpisodes.length);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedItems();
  }

}
