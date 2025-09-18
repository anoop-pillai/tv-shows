import { Injectable } from '@angular/core';
import { ShowResponse } from '../../models/ShowResponse';
import { HttpClient } from '@angular/common/http';
import { ShowDetails } from '../show-details/show-details';
import { Season } from '../../models/Season';
import { PersonCharacter } from '../../models/personCharacter';
import { Episode } from '../../models/Episode';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  baseUrl = environment.tvMazeApiUrl;
  constructor(private http: HttpClient) {}

  getShows(query: string) {
    return this.http
      .get<ShowResponse[]>(`${this.baseUrl}search/shows?q=${query}`);
  }

  getShowDetails(id: number) {
    return this.http.get<Show>(`${this.baseUrl}shows/${id}`);
  }

  getShowSeasons(id: number) {
    return this.http.get<Season[]>(`${this.baseUrl}shows/${id}/seasons`);
  }

  getSeasonEpisodes(seasonId: number) {
    return this.http.get<Episode[]>(`${this.baseUrl}seasons/${seasonId}/episodes`);
  }

  getCasts(showId: number) {
    return this.http.get<PersonCharacter[]>(`${this.baseUrl}shows/${showId}/cast`);
  }

  getEpisodes(showId: number) {
    return this.http.get<Episode[]>(`${this.baseUrl}shows/${showId}/episodes`);
  }
}
