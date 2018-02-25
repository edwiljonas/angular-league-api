import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { isSuccess } from '@angular/http/src/http_utils';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable()
export class ManagerService {

  // configUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' +
      // 'Arc?api_key=RGAPI-fa69152e-78b6-4f6f-bf10-fb31289606a7';

  configUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' +
      'BrokenPlayerTest?api_key=RGAPI-fa69152e-78b6-4f6f-bf10-fb31289606a7';

  constructor(private http: HttpClient) { }

  getConfig() {
      this.http.get(this.configUrl).pipe(
          catchError( this.handleError) ).toPromise()
          .then(
              res => { // Success
                  console.log(res);
              }
          );
  }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          console.error('*** An error has occurred in you league API: ', error.error.message);
      } else if (error.status === 404) { // 404 error found handler
          console.error(
            `You have received an ${error.status} error.`
          );
      } // You can now create a function that controls all error responses via the handleError function
      return new ErrorObservable(
          'Oops, it exploded... Please try again later.');
  }

}
