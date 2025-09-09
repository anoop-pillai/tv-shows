import { Component, Input, signal } from '@angular/core';
import { PersonCharacter } from '../../models/personCharacter';
import { ShowService } from '../service/show-service';
import { MatCard } from "@angular/material/card";
import { MatCardTitle, MatCardSubtitle } from '@angular/material/card';

@Component({
  selector: 'app-cast',
  imports: [MatCard, MatCardTitle, MatCardSubtitle],
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
