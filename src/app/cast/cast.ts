import { Component, Input, signal } from '@angular/core';
import { PersonCharacter } from '../../models/personCharacter';
import { ShowService } from '../service/show-service';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-cast',
  imports: [MatCard],
  templateUrl: './cast.html',
  styleUrl: './cast.css'
})
export class Cast {
  casts = signal<PersonCharacter[]>([]);
     @Input() showId!: number;

  constructor(private showService: ShowService) { }

ngOnInit() {

  this.showService.getCasts(this.showId).subscribe(casts => {
    this.casts.set(casts);
  });
}
}
