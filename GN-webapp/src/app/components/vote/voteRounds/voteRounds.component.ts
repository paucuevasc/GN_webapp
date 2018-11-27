import { Component, OnInit } from '@angular/core';
import { VoteListService } from '../../../services/searchServices/voteList.service';
import { ListItem, List } from '../../searcher/shared/models';
import { VoterNumService } from '../../../services/voteServices/voterNum.service';

@Component({
  selector: 'app-vote-rounds',
  templateUrl: './voteRounds.component.html',
  styleUrls: ['./voteRounds.component.scss']
})
export class VoteRoundsComponent implements OnInit {
list = new List ([]);
i = 0;
currentMovie;
nVoters;
  constructor( private voteListService: VoteListService,
                private voterNumService: VoterNumService ) { }

  ngOnInit () {
    // if (!this.list) { this.list = new List([]); }

    this.list = this.voteListService.getList();
    this.nVoters = this.voterNumService.getVoters();
    this.currentMovie = this.list.movies[0];
      console.log(this.list);
      console.log(this.nVoters);


  }
  nextMovie() {
    if (this.i < this.list.movies.length - 1) {
    this.i++;
  } else {
    this.i = this.i;
  }
  this.currentMovie = this.list.movies[this.i];
  }

  prevMovie() {
      if (this.i > 0) {
      this.i--;
    } else {
      this.i = this.i;
    }
    this.currentMovie = this.list.movies[this.i];
    }

  }




