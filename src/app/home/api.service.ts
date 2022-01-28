import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public testApi(): Observable<string> {
    return this.httpClient.get(environment.api_url +'/test/1').pipe(
      map((result: any) => result.response),
      catchError((error: HttpErrorResponse) => {
        throw error;
      }));
  }
}
