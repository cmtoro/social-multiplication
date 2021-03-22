import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Multiplication, MultiplicationResultAttempt } from './model/model';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MultiplicationService {

  private url = 'http://localhost:8080/';
  private multiplicationURL = this.url + 'multiplication/random';
  private resultsURL = this.url +   'results';

  private handleError: HandleError;

  constructor(private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('MultiplicationService');
    }

  getRandomMultiplication(): Observable<Multiplication> {
    return this.httpClient.get<Multiplication>(this.multiplicationURL).pipe(
      catchError(this.handleError('getRandomMultiplication', new Multiplication()))
    );
  }

  checkAttempt(multiplicationResultAttempt: MultiplicationResultAttempt): Observable<MultiplicationResultAttempt> {
    return this.httpClient.post<MultiplicationResultAttempt>(this.resultsURL, multiplicationResultAttempt, httpOptions).pipe(
      catchError(this.handleError('checkAttempt', new MultiplicationResultAttempt()))
    );
  }

}
