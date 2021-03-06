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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';



const httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey', 'Content-Type': 'application/json' })
  };



@Injectable()
export class GnapiService {

  sendList = new List([]);
  findList = new List([]);
  transformList;
  searchID;
private  apiURL = 'http://localhost:3000/list';

  constructor(private http: HttpClient) { }






  dataSendConverter (list: List) {
   this.transformList = '{ "listID":' + JSON.stringify(list.listID) + ',';
   this.transformList = this.transformList + '"TypeList": ' + JSON.stringify(list.TypeList) + ',';
   this.transformList = this.transformList + '"Movies": [';
   for (let i = 0; i < list.movies.length; i++) {
     if (i < list.movies.length - 1) {
    this.transformList = this.transformList + JSON.stringify(list.movies[i]) + ',';
  } else {
    this.transformList = this.transformList + JSON.stringify(list.movies[i]);
  }}

  this.transformList = this.transformList + ']}';
   console.log(this.transformList);

  }

  addList (list: List) {

    this.sendList.movies = list.movies;
    this.sendList.listID = '1';
    this.sendList.TypeList = 'temp';
    this.dataSendConverter(this.sendList);
      return this.http.post(this.apiURL, this.transformList, httpOptions)
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log('ERROR');
      });
  }

  public getList(findList): Promise<any> {
console.log(this.apiURL + '/' + findList);
    if (findList === 'Barcelona') {
      this.searchID = '5bfd1164d21f6f466b7e6e94';
    } if (findList === 'Donosti') {
      this.searchID = '5bf7cb0cad54d822eef256bb';
    }
    return this.http.get(this.apiURL + '/' + this.searchID)
    .toPromise().then((data: any) =>  {
      return data;
     }).catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }


}
