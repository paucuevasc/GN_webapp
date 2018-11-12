import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  favCounter = 0;

  private subject = new Subject<any>();

  sendFavCount(favCount) {

    this.favCounter = this.favCounter + favCount;
    this.subject.next( this.favCounter );
  }

  getFavCounter(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
