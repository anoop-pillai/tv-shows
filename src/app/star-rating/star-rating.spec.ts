import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRating } from './star-rating';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StarRating', () => {
  let component: StarRating;
  let fixture: ComponentFixture<StarRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRating],providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
