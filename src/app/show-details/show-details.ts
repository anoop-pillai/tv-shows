import { Component, signal } from '@angular/core';
import { ShowService } from '../service/show-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowResponse } from '../../models/ShowResponse';
import { MatChipsModule } from '@angular/material/chips';
import { StarRating } from "../star-rating/star-rating";
import { Seasons } from "../seasons/seasons";
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Cast } from "../cast/cast";
import { ReviewComponent } from "../review-component/review-component";
import { MatIcon } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-show-details',
  imports: [MatChipsModule, StarRating, Seasons, MatTab, MatTabGroup, Cast, ReviewComponent, MatIcon, YouTubePlayerModule, MatCard, MatCardModule],
  templateUrl: './show-details.html',
  styleUrl: './show-details.css'
})
export class ShowDetails {
  showId = signal<number>(0);
  show: Show| undefined;
  rating:number | undefined;
  videoId = signal<string >('rCj-Fb1OmXg');///
  constructor(private showService:ShowService,private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
          const id = this.route.snapshot.paramMap.get('id');
          this.showId.set(Number(id));
          this.showService.getShowDetails(Number(id)).subscribe(show => {
                   this.show = show; 
                   this. rating = this.show?.rating.average;

          });
        }
        goBack(): void {
          this.router.navigate(['/']);
        }

         onReady(event: YT.PlayerEvent) {
        // Handle player ready event
              event.target.playVideo();

        console.log('YouTube player ready:', event.target);
      }

      onStateChange(event: YT.OnStateChangeEvent) {
        // Handle player state changes (e.g., playing, paused)
        console.log('YouTube player state changed:', event.data);
      }
    }