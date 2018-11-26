import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Jsonp } from '@angular/http';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import cors from 'cors';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List, ListItem } from '../../components/searcher/shared/models';



const httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey', 'Content-Type': 'application/json' })
  };



@Injectable()
export class GnapiService {

  sendList = new List([]);

private  apiURL = 'http://localhost:3000/List';

  constructor(private http: HttpClient) { }

  public getList(): Observable<List[]> {
    return this.http.get<List[]>(this.apiURL );
  }






  addList (list: List) {

    this.sendList.movies = list.movies;
    debugger;
      return this.http.post(this.apiURL, this.sendList.movies, httpOptions)
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log('ERROR');
      });
  }

}
