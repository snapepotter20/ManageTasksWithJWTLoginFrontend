import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8091';
  private usernameSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + '/authenticate', { username, password }, { responseType: 'text' }).pipe(
      tap((token: string) => {
        localStorage.setItem('jwt', token);
        localStorage.setItem('username', username);
        this.usernameSubject.next(username);
      })
    );
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUsernameObservable() {
    return this.usernameSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  logout() {
    localStorage.clear();
  }
}
