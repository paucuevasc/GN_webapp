import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private subject = new Subject<any>();

  sendMessage(message) {
    this.subject.next( message );
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
