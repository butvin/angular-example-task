import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ajax, AjaxError, AjaxResponse} from 'rxjs/ajax';



@Injectable({ providedIn: 'root' })
export class PostsService {

  HOST = 'https://gorest.co.in/public-api/';

  TOKEN = 'b0f6mbdwshpphciYndebZJFGgzunFRWws_-0';

  httpParams: HttpParams = new HttpParams()
    .set('posts?access-token', this.TOKEN)
    .set('_format' , 'json');
  // .set('page' , '5');

  url: string = this.HOST + this.httpParams;

  constructor(private postsService: HttpClient) {}

  /**
   * GET Method
   * Get posts using GET.
   */
  public getPosts(pageNumber: number): Observable<any> {
    const url: string = this.url + '&page=' + pageNumber.toString();
    return this.postsService.get(url, {responseType: 'json'}).pipe(catchError( this.handleError ));
  }

  /* Get posts using Ajax. */
  public getPostsAjax(pageNumber: number): Observable<AjaxResponse|AjaxError> {
    const url: string = this.url + '&page=' + pageNumber.toString();
    return ajax(url).pipe(catchError( this.handleError ));
  }

  /* Create an Observable out of a promise */
  public getPostsByPromise(pageNumber: number) {
    const url: string = this.url + '&page=' + pageNumber.toString();
    return from(fetch(url));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Code ${error.status}, ` + `Body: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Huston, we have a trouble...');
  }
}
