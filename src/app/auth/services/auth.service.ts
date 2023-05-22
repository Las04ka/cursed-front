import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAuthCredentials } from '../models/credentials';
import { IRegisterData } from '../models/register-data';
import { IResponse } from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router:Router,
  ) {
  }

  login(credentials: IAuthCredentials): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${ environment.apiUrl }/auth/login`,
      credentials,
    );
  }

  register(credentials: IRegisterData): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${ environment.apiUrl }/auth/register`, credentials);
  }

  logout(): void {
    localStorage.clear()
    this.router.navigateByUrl('/auth/login')
  }
}
