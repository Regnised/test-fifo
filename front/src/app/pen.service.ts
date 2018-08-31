import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pen } from './pen';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PenService {

  // private pensUrl = 'http://localhost:3000';  // URL to web api
  private pensUrl = 'https://test-store1.herokuapp.com';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPens(): Observable<any> {
    return this.http.get<any>(`${this.pensUrl}/api/goods`)
      .pipe(
        tap(pens => this.log('fetched pens')),
        catchError(this.handleError('getPens', []))
      );
  }

  /** POST: add a new Pen to the server */
  addBallpen(ballpen: any): Observable<any> {
    return this.http.post<any>(`${this.pensUrl}/api/buy`, ballpen, httpOptions).pipe(
      tap((ballpen: any) => this.log(`added Pen`)),
      catchError(this.handleError<any>('addPen'))
    );
  }

  /** POST: sell a Pen */
  sellBallpen(ballpen: any): Observable<any> {
    return this.http.post<any>(`${this.pensUrl}/api/sell`, ballpen, httpOptions).pipe(
      tap((ballpen: any) => this.log(`sold Pen`)),
      catchError(this.handleError<any>('sellPen'))
    );
  }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.pensUrl}/api/transactions`)
      .pipe(
        tap(pens => this.log('fetched transactions')),
        catchError(this.handleError('getTransactions', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PenService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PenService: ${message}`);
  }
}
