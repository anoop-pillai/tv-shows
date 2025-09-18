import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cast } from './cast';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Cast', () => {
  let component: Cast;
  let fixture: ComponentFixture<Cast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cast],providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
