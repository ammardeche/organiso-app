import { inject, Inject, Injectable } from '@angular/core';
import { TokenService } from './token-service.service';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from '../interfaces/IAuthResponse';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { IRegisterRequest } from '../interfaces/IRegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginApiUrl = ' http://localhost:5289/api/auth/login';
  RegisterApiUrl = 'http://localhost:5289/api/auth/register';

  http = inject(HttpClient);
  tokenService = inject(TokenService);

  // when we subscribe we will emit the last value hold in this behavior subject
  private authState = new BehaviorSubject<boolean>(
    this.tokenService.hasToken()
  );

  // we will subscribe in this value later
  isAuthenticated$ = this.authState.asObservable();

  constructor() {}

  login(email: string, password: string): Observable<IAuthResponse> {
    const loginData: ILoginRequest = { email, password };

    return this.http.post<IAuthResponse>(this.loginApiUrl, loginData).pipe(
      tap((res) => {
        this.tokenService.setToken(res.accessToken);
        this.authState.next(true);
      })
    );
  }
  register(userData: IRegisterRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.RegisterApiUrl, userData).pipe(
      tap((res) => {
        this.tokenService.setToken(res.accessToken);
        this.authState.next(true);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }
}
