import { Injectable } from '@angular/core';
import { ShowResponse } from '../../models/ShowResponse';
import { HttpClient } from '@angular/common/http';
import { ShowDetails } from '../show-details/show-details';
import { Season } from '../../models/Season';
import { PersonCharacter } from '../../models/personCharacter';
import { Episode } from '../../models/Episode';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  baseUrl = 'https://api.tvmaze.com/';
  constructor(private http: HttpClient) { }

  getShows(query: string) {
    return this.http.get<ShowResponse[]>(`${this.baseUrl}search/shows?q=${query}`);
  }

  getShowDetails(id: number) {
    return this.http.get<Show>(`${this.baseUrl}shows/${id}`);
  }

  getShowSeasons(id:number)
  {
    return this.http.get<Season[]>(`${this.baseUrl}shows/${id}/seasons`);
  }

  getCasts(showId:number)
  {
    return this.http.get<PersonCharacter[]>(`${this.baseUrl}shows/${showId}/cast`);
  }

  getEpisodes(showId:number)
  {
    return this.http.get<Episode[]>(`${this.baseUrl}shows/${showId}/episodes`);
  }
  }
