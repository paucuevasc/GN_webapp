import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { List, ListItem } from '../../components/searcher/shared/models';

@Injectable({
  providedIn: 'root'
})
export class VoterNumService {

  numVoters;
  private subject = new Subject<any>();

  sendVoters(nVoters) {
    this.subject.next( nVoters );
    this.numVoters = nVoters;
  }

  getVoters() {
    // return this.subject.asObservable();
    return this.numVoters;
  }


  constructor() { }
}
