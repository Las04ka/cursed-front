import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

import { LocalStorageService } from '../services/local-storage.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) {}

  intercept<T, U>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<U>> {
    const token = this.localStorageService.getData('Authorization');
    if (token) {
      const processedReq = this.addToken(req, token);
      return next.handle(processedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.localStorageService.removeData('Authorization');
            this.router.navigateByUrl('auth/login');
          }
          return throwError(error);
        }),
      );
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403)
          this.authService.logout();
          this.snackbarService.openSnackBar('Sign in first');
        this.router.navigateByUrl('auth/login');
        return throwError(error);
      }),
    );
  }

  addToken<T>(request: HttpRequest<T>, token: string): HttpRequest<T> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
