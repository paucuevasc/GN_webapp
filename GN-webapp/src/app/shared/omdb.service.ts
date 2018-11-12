import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Jsonp } from '@angular/http';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class OmdbService {
 apiKey = '837bd976';
 API = {
  SEARCH: 'http://www.omdbapi.com/?apikey=' + this.apiKey + '&'
};
  private _albums: Array<any> = [];
  private _artistId = 0;

  constructor(private http: HttpClient) { }

  public search(searchPage, searchWord): Promise<any> {
    console.log( this.API.SEARCH );
    return this.http.get(`${this.API.SEARCH}page=${searchPage}&s=${searchWord}`)
    .toPromise().then((data: any) =>  {
      return data.Search; }).catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
