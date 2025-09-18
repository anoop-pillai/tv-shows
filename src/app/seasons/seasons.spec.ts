import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seasons } from './seasons';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import it from '@angular/common/locales/it';

describe('Seasons', () => {
  let component: Seasons;
  let fixture: ComponentFixture<Seasons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seasons],providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seasons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

