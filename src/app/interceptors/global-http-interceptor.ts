import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';


export const globalHttpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const snackBar = inject(MatSnackBar);

  const router = inject(Router);
  //const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      // Log error to console or remote service
      console.error('HTTP Error:', error);

if (error.status === 0) {
        snackBar.open('Network error: Unable to reach the server.', 'Close', {
          duration: 4000,
        });
      }
      // Show user-friendly message
      //snackBar.open('Something went wrong. Please try again.', 'Close', {
      //  duration: 3000,
      //});

      // Redirect on specific status codes
      if(error.status === 404){
        console.log('In 404 error from interceptor');
       // router.navigate(['/not-found']);
      } else if (error.status === 401) {
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate(['/unauthorized']);
      }

      return throwError(() => error);
    })
  );

};
