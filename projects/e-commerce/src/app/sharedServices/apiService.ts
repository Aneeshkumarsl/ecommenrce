import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL:any = env.urlSet;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private options = { headers: new HttpHeaders().set('Content-Type', 'application/json')  };

  constructor(
    private httpClient: HttpClient,
    ) {}

  public get(path: string, app:string, params:any): Observable<any> {      
    return this.httpClient.get(BASE_URL[app] + path, { params }).pipe(catchError(this.formatErrors));
  }

  public put(path: string,app:string , body: object = {}): Observable<any> {
    return this.httpClient
      .put(BASE_URL[app] + path, JSON.stringify(body), )
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, app:string ,body: object = {}): Observable<any> {
   
    return this.httpClient
      .post(BASE_URL[app] + path, JSON.stringify(body), )
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(BASE_URL + path).pipe(catchError(this.formatErrors));
  }


  public formatErrors(error: any): Observable<any> {
    
    
    return throwError(error.error);
  }
}
