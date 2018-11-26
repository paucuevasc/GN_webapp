import { Component, OnInit } from '@angular/core';
import { VoteListService } from '../../../services/searchServices/voteList.service';
import { ListItem, List } from '../../searcher/shared/models';

@Component({
  selector: 'app-vote-rounds',
  templateUrl: './voteRounds.component.html',
  styleUrls: ['./voteRounds.component.scss']
})
export class VoteRoundsComponent implements OnInit {
list = new List ([]);
currentMovie;
  constructor( private voteListService: VoteListService ) { }

  ngOnInit () {
    // if (!this.list) { this.list = new List([]); }

    this.list = this.voteListService.getList();

      console.log(this.list);
      this.moviesPresentation(this.list);

  }
  moviesPresentation(list) {
    for (let i = 0; i < list.movies.length; i++) {

      this.currentMovie = list.movies[i];
      // let a = angular.element(current)
      console.log(this.currentMovie);
      this.sleep(5000);
    }
  }

  sleep(time) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > time) {
        break;
      }
    }
  }

}
