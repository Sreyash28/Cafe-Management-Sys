import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

const baseUrl = 'http://localhost:8090/api/users/authenticate';
const Url = 'http://localhost:8090/api/users/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = false;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${Url}`, user).pipe(catchError(this.handleError));
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${baseUrl}`, user)
      .pipe(catchError(this.handleError));
  }

  // isValidToken(): Observable<any> {
  //   let headers = new HttpHeaders()
  //     .set('Authorization', 'Bearer ' + localStorage.getItem("access-token"))
  //     .set('Content-Type', 'application/json');
  //   return this.http.get<any>(`${baseUrl}/validate`, { headers });

  // }
  saveAuthorizationToken(token: string, userId: string) {
    localStorage.setItem('access-token', token);
    localStorage.setItem('user-id', userId);
  }

  getAuthorizationToken() {
    let token: any = localStorage.getItem('access-token');
    if (token === null) {
      throwError(() => new Error('Token not present'));
    }
    return token;
  }
  isLoggenIn(): boolean {
    let token: string | null = localStorage.getItem('access-token');
    this.isLogged = token !== null;
    return this.isLogged;
  }

  logout() {
    localStorage.removeItem('access-token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
