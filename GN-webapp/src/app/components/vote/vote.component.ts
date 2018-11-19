import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteListService } from '../../services/searchServices/voteList.service';
import { ListItem, List } from '../searcher/shared/models';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  listSubscription: Subscription;
  list = new List ([]);


  constructor(private router: Router,
              private voteListService: VoteListService ) {
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
newList() {
  delete this.list.movies;
  this.voteListService.sendList(this.list);

  this.router.navigate( ['/search-home']);
}

modList() {
  this.voteListService.sendList(this.list);

  this.router.navigate( ['/search-home']);
}
}
