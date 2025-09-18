
import { TestBed } from '@angular/core/testing';

import { ShowService } from './show-service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ShowResponse } from '../../models/ShowResponse';

describe('ShowService', () => {
  let service: ShowService;
  let httpMock: HttpTestingController;
  const mockResponse: ShowResponse[] = [
    { show: { id: 1, name: 'Breaking Bad' } } as ShowResponse,
    { show: { id: 2, name: 'Better Call Saul' } } as ShowResponse
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShowService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ShowService);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get empty array on on get shows call', () => {
    service.getShows('test').subscribe(shows => {
      expect(shows).toEqual([]);
    });  
    const req = httpMock.expectOne('https://api.tvmaze.com/search/shows?q=test');
    expect(req.request.method).toBe('GET');
    req.flush([]); 
  });

  it('should return valid values from service on getShows method', () => {
    
    service.getShows('breaking').subscribe(shows => {
      
      expect(shows).toEqual(mockResponse);
    });
    
    const req = httpMock.expectOne('https://api.tvmaze.com/search/shows?q=breaking');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    });
    it('should return a show when its id is passed', () => {
      const mockShow: Show = {
  id: 1,
  url: "https://www.tvmaze.com/shows/1/mock-show",
  name: "Mock Show",
  type: "Scripted",
  language: "English",
  genres: ["Drama", "Comedy"],
  status: "Running",
  runtime: 60,
  averageRuntime: 60,
  premiered: "2020-01-01",
  ended: "",
  officialSite: "https://www.mockshow.com",
  schedule: { time: "20:00", days: ["Monday"] },
  rating: { average: 8.5 },
  weight: 100,
  network: {
    id: 1,
    name: "Mock Network",
    country: { name: "USA", code: "US", timezone: "America/New_York" },
    officialSite: "https://www.mocknetwork.com"
  },
  webChannel: null,
  dvdCountry: null,
  externals: { tvrage: 123, thetvdb: 456, imdb: "tt1234567" },
  image: { medium: "https://www.mockshow.com/medium.jpg", original: "https://www.mockshow.com/original.jpg" },
  summary: "This is a mock show used for testing.",
  updated: 1630000000
};
      service.getShowDetails(1).subscribe(show => {
        expect(show).toEqual(mockShow);
      });
      const req = httpMock.expectOne('https://api.tvmaze.com/shows/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockShow);
    });
    
  });
