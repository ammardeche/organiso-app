import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());

  // check the current user state

  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  token = this.tokenSignal.asReadonly();
  // variable for the token
  private readonly TOKEN_KEY = 'access_token';
  // get the token form the local storage
  private getTokenFromStorage(): string | null {
    return localStorage.getItem('access_token');
  }
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
  }

  hasToken(): boolean {
    return !!this.getTokenFromStorage();
  }
}
