import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteListService } from '../../../services/searchServices/voteList.service';
import { ListItem, List } from '../../searcher/shared/models';
import { Subscription } from 'rxjs/Subscription';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from 'protractor';
import { GnapiService } from '../../../services/searchServices/gnapi.service';
import { debounceTime } from 'rxjs/operators';
import { VoterNumService } from '../../../services/voteServices/voterNum.service';



@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  listSubscription: Subscription;
  list = new List ([]);
  participantsNum;
  voteStarter = 0;

  constructor(private router: Router,
              private voteListService: VoteListService,
              private gnapiService: GnapiService,
              private voterNumService: VoterNumService ) {
                  // this.listSubscription =
                     //       this.listService.getList().subscribe((list) => {
                       //       debugger;
                         //     this.list = list;
                           // });
}
ngOnInit () {
  // if (!this.list) { this.list = new List([]); }

  this.list = this.voteListService.getList();

    console.log(this.list);

}
participantsCounter(participants) {
  this.participantsNum = participants;
}
newList() {

  delete this.list.movies;
  this.voteListService.sendList(this.list);

  this.router.navigate( ['/search-home']);
}

modList() {
  this.voteListService.sendList(this.list);

  this.router.navigate( ['/search-home']);
}
voteStart() {
  this.voteStarter = 1;
  this.voteListService.sendList(this.list);
  this.voterNumService.sendVoters(this.participantsNum);
}
listSelection(listSelection) {
  console.log(listSelection);
  if (listSelection === 'new') {
    this.list.listID = '1';
    this.list.TypeList = 'temp';
    this.newList();
  } if (listSelection === 'Barcelona') {
    console.log('Grillos de barna gogogo');
    this.gnapiService.getList(listSelection).then(data => {
      this.dataDecoder(data);
        });


  } if (listSelection === 'Donosti') {
    console.log('Grillos de Donosti siempre acaban a hostis');
    this.gnapiService.getList(listSelection).then(data => {
      this.dataDecoder(data);
        });
  }

}

dataDecoder(data) {
  console.log(data);
  console.log(data.Movies);
  this.list.TypeList = data.TypeList;
  this.list.listID = data._id;
  for (let i = 0; i < data.Movies.length; i++) {
    // debugger;
    const movie = new ListItem(data.Movies[i].title, data.Movies[i].year, data.Movies[i].poster, data.Movies[i].imdbID);
    this.list.addMovie(movie);
  }
  console.log(this.list);
}
}
