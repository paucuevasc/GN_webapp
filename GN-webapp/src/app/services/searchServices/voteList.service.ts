import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { List, ListItem } from '../../components/searcher/shared/models';

@Injectable({
  providedIn: 'root'
})
export class VoteListService {

  currentList = new List([]);
  private subject = new Subject<any>();

  sendList(list) {
    this.subject.next( list );
    this.currentList = list;
  }

  getList() {
    // return this.subject.asObservable();
    return this.currentList;
  }


  constructor() { }
}
