import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Orders } from './../models/order';
import { Menu } from '../models/menu';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8090/api/v1/orders'; // Replace with your API URL

  constructor(private http: HttpClient, private menuService: MenuService) {}

  createOrder(order: Orders): Observable<Orders> {
    return this.http
      .post<Orders>(`${this.apiUrl}`, order)
      .pipe(catchError(this.handleError));
  }

  findAllMenuItems(): Observable<Menu[]> {
    return this.menuService.findAllMenuItems();
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
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
