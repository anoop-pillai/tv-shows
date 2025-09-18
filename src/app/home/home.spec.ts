
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ShowService } from '../service/show-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ShowResponse } from '../../models/ShowResponse';

const mockShows: ShowResponse[] = [
  {
    score: 10,
    show: {
      id: 1,
      url: 'https://www.tvmaze.com/shows/1/mock-show',
      name: 'Mock Show',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Comedy'],
      status: 'Running',
      runtime: 60,
      averageRuntime: 60,
      premiered: '2020-01-01',
      ended: '',
      officialSite: 'https://www.mockshow.com',
      schedule: { time: '20:00', days: ['Monday'] },
      rating: { average: 8.5 },
      weight: 100,
      network: {
        id: 1,
        name: 'Mock Network',
        country: { name: 'USA', code: 'US', timezone: 'America/New_York' },
        officialSite: 'https://www.mocknetwork.com'
      },
      webChannel: null,
      dvdCountry: null,
      externals: { tvrage: 123, thetvdb: 456, imdb: 'tt1234567' },
      image: { medium: '', original: '' },
      summary: 'A mock show',
      updated: 1630000000
    }
  }
];

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let showServiceSpy: jasmine.SpyObj<ShowService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let store: Store;

  beforeEach(async () => {
    showServiceSpy = jasmine.createSpyObj('ShowService', ['getShows']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ShowService, useValue: showServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState: { search: { query: '' } } })
      ],
      declarations: [Home]
    }).compileComponents();
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update queryString and call search when store emits query', () => {
    spyOn(component, 'search');
    (store as any).overrideSelector('selectSearchQuery', 'test-query');
    store.refreshState();
    fixture.detectChanges();
    expect(component.queryString()).toBe('test-query');
    expect(component.search).toHaveBeenCalled();
  });

  it('should call showService.getShows and update shows on search', () => {
    showServiceSpy.getShows.and.returnValue(of(mockShows));
    component.searchForm.setValue({ query: 'mock' });
    component.search();
    expect(showServiceSpy.getShows).toHaveBeenCalledWith('mock');
    expect(component.shows()).toEqual(mockShows);
    expect(component.searching()).toBe(false);
  });

  it('should navigate to details page', () => {
    component.details(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/details', 1]);
  });
});
