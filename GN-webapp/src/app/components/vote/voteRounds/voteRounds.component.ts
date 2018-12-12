import { Component, OnInit } from '@angular/core';
import { VoteListService } from '../../../services/searchServices/voteList.service';
import { ListItem, List, Voter, Votes, VotersList } from '../../searcher/shared/models';
import { VoterNumService } from '../../../services/voteServices/voterNum.service';

@Component({
  selector: 'app-vote-rounds',
  templateUrl: './voteRounds.component.html',
  styleUrls: ['./voteRounds.component.scss']
})
export class VoteRoundsComponent implements OnInit {
currentList = new List ([]);
i = 0;
currentMovie;
nVoters;
round = 1;
roundVotes = [];
votersList = new VotersList ([]);
alphabet: Array<any> = ('abcdefghijklmnopqrstuvwxyz').split('');

  constructor( private voteListService: VoteListService,
                private voterNumService: VoterNumService ) { }

  ngOnInit () {
    /*
    We start setting the choosen list and the nunmber of voters
    */

    this.currentList = this.voteListService.getList();
    this.nVoters = this.voterNumService.getVoters();
    this.currentMovie = this.currentList.movies[0];
    this.currentMovie.position = 0;
    this.currentMovie.nVotes = 0;
    this.roundVotes[this.currentMovie.position] = ' ';
      console.log(this.currentList);
      console.log(this.nVoters);

    this.votersSet(this.nVoters);
  }

  // Pass to the next movie in the list.
  nextMovie() {
    if (this.i < this.currentList.movies.length - 1) {
    this.i++;
    this.currentMovie = this.currentList.movies[this.i];
    this.currentMovie.nVotes = 0;
    this.currentMovie.position = this.i;
    this.roundVotes[this.currentMovie.position] = ' ';
  } else {
    this.i = this.i;
    this.endRound();
  }
  }

  // Return to the previous movie in the list.
  prevMovie() {
      if (this.i > 0) {
      this.i--;
    } else {
      this.i = this.i;
    }
    this.currentMovie = this.currentList.movies[this.i];
    this.currentMovie.position = this.i;
    }

    // Set the votes availables for the selected amount of voters.
    votersSet (nVoters) {
      for (let i = 0; i < nVoters - 1; i++) {
       const votes = new Votes (6, 3);
       const voter = new Voter (this.alphabet[i], true, votes);

       this.votersList.addVoter(voter);
      }
      console.log(this.votersList);
    }

    // Count the votes, make sure there's an entry and there's no repition.
    countVotes(votes) {
      let repeated: boolean;
      if (votes === 'votes') {
        this.currentMovie.nVotes = 0;
        this.sendToRound();
      } else {
      const splitted = votes.split('');
      this.roundVotes[this.currentMovie.position] = splitted;
      console.log(this.roundVotes[this.currentMovie.position]);
      repeated = this.detectRepetition( this.roundVotes[this.currentMovie.position]);
      if (repeated === false) {
      this.currentMovie.nVotes = splitted.length;
      this.sendToRound();
      }
    }}

    // Send the counted votes at the round script.
    sendToRound() {
      if (this.round === 1) {
        this.firstRoundMovieVotation();
        } if (this.round === 2) {
          this.secondRoundMovieVotation();
        }
    }

    // Detect repetition in a vote
    detectRepetition(votes) {
      let repeated: boolean;
      repeated = false;
      for (let i = 0; i < votes.length; i++) {
        for (let j = i + 1; j < votes.length; j++) {
          if ( votes[i] === votes [j]) {
            console.log('NO SE PUEDE VOTAR MAS DE UNA VEZ');
            return repeated = true;
            break;
          }
        }
      }
      return repeated;
    }

    // Script for the first round, ensure the voters have enough votes.
    firstRoundMovieVotation() {
      for (let i = 0; i < this.roundVotes[this.currentMovie.position].length; i++) {
        for (let j = 0; j < this.votersList.voters.length; j++) {
        if ( this.roundVotes[this.currentMovie.position][i] === this.votersList.voters[j].voterID) {
          if (this.votersList.voters[j].votes.fRoundVotes > 0) {
          this.votersList.voters[j].votes.fRoundVotes--;
          console.log(this.votersList.voters[j]);
        } else {
          console.log('A ' + this.votersList.voters[j].voterID + ' no le quedan votos!');
          this.currentMovie.nVotes--;
        }
        }
      }
      }
    }

    // Script for the second round, ensure the voters have enough votes.
    secondRoundMovieVotation() {
      for (let i = 0; i < this.roundVotes[this.currentMovie.position].length; i++) {
        for (let j = 0; j < this.votersList.voters.length; j++) {
        if ( this.roundVotes[this.currentMovie.position][i] === this.votersList.voters[j].voterID) {
          if (this.votersList.voters[j].votes.sRoundVotes > 0) {
          this.votersList.voters[j].votes.sRoundVotes--;
          console.log(this.votersList.voters[j]);
        } else {
          console.log('A ' + this.votersList.voters[j].voterID + ' no le quedan votos!');
          this.currentMovie.nVotes--;
        }
        }
      }
      }
    }

    // Script for the thirst round, deletes the vetoed movies.
    vetoRound(movie) {
      if (this.round === 3) {
        console.log(movie);
        let i = 0;
        while (i < this.currentList.movies.length) {
          if (movie.imdbID === this.currentList.movies[i].imdbID) {
            this.currentList.movies.splice(i, 1);
            this.roundVotes.splice(i, 1);
          }  else {
            i++;
          }
        }
      }
    }


    // end of the current round.
    endRound() {
      this.deleteMovies();
      this.setNextRound();

    }

      // delete the movies without enough votes.
      deleteMovies() {
        console.log(this.roundVotes);
        let i = 0;
          while (i < this.currentList.movies.length) {
          if (this.roundVotes[i].length < 3) {
            console.log(this.currentList.movies[i]);
            this.currentList.movies.splice(i, 1);
            this.roundVotes.splice(i, 1);
            console.log(this.currentList.movies);
          } else {
            i++;
          }
        }
      }

      // set the parameters for the next round.
      setNextRound() {

        for (let x = 0; x < this.roundVotes.length; x++) {
          this.roundVotes[x] = ' ';
        }
        this.i = 0;
        this.currentMovie = this.currentList.movies[this.i];
        this.currentMovie.position = 0;
        this.currentMovie.nVotes = 0;
        this.roundVotes[this.currentMovie.position] = ' ';
        this.round++;
        }




  }




