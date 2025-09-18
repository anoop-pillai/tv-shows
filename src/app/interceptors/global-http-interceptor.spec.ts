import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { globalHttpInterceptor } from './global-http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('globalHttpInterceptor', () => {
  
let http: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => globalHttpInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        provideHttpClient(
          withInterceptors([globalHttpInterceptor])
        )
      ]
      
});

 http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

  });

afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  
it('should handle network error with status 0', () => {
    http.get('/api/test').subscribe({
      next: () => fail('Should have failed with network error'),
      error: (error) => {
        expect(error.status).toBe(0);
      }
    });

    const req = httpMock.expectOne('/api/test');
    req.error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
  });

});
