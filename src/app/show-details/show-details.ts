import { Component, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { ActivatedRoute } from '@angular/router';
import { ShowResponse } from '../../models/ShowResponse';
import { MatChipsModule } from '@angular/material/chips';
import { StarRating } from "../star-rating/star-rating";
import { Seasons } from "../seasons/seasons";
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Cast } from "../cast/cast";
import { Episodes } from "../episodes/episodes";

@Component({
  selector: 'app-show-details',
  imports: [MatChipsModule, StarRating, Seasons, MatTab, MatTabGroup, Cast, Episodes],
  templateUrl: './show-details.html',
  styleUrl: './show-details.css'
})
export class ShowDetails {
  showId = signal<number>(0);
  show: Show| undefined;
  rating:number | undefined;
  constructor(private showService:ShowService,private route: ActivatedRoute) { }
  ngOnInit() {
          const id = this.route.snapshot.paramMap.get('id');
          console.log("Show ID: ", id);
          this.showId.set(Number(id));
          this.showService.getShowDetails(Number(id)).subscribe(show => {
                   this.show = show; 
                   this. rating = this.show?.rating.average;

          });
        }

}
