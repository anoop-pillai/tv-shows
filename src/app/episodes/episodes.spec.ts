import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Episodes } from './episodes';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Episodes', () => {
  let component: Episodes;
  let fixture: ComponentFixture<Episodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Episodes],providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Episodes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
