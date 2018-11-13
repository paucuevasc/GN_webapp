import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private subject = new Subject<any>();

  sendList(list) {
    this.subject.next( list );
  }

  getList(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() { }
}
