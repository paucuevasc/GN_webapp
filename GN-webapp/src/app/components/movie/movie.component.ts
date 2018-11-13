import { Component, Input, OnInit } from '@angular/core';
import { OmdbService } from '../../shared/omdb.service';
import { DisplayService } from '../../shared/display.service';
import { CounterService } from '../../shared/counter.service';
import { ListService } from '../../shared/list.service';
import { Subscription } from 'rxjs/Subscription';
import { ListItem, List, Result } from '../shared/models';




@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  providers: [OmdbService],
  styleUrls: ['./movie.component.scss']
})



export class MovieComponent {

selectionMade = false;
displaySubscription: Subscription;
listSubscription: Subscription;
title: string;
year: string;
poster: string;
favCount: number;
list = new List([]);
results: Array<Result>;
searchResults;
searchPage = 1;
searchWord;
searchMoreOption = false;
displayMode;

  constructor(private omdbService: OmdbService,
              private counterService: CounterService,
              private displayService: DisplayService,
              private listService: ListService) {
                this.displaySubscription =
                this.displayService.getMessage().subscribe((message) => {
                  this.displaySubs(message);
                });
               }

displaySubs(message) {
  this.selectionMade = message[1];
  this.displayMode = message[4];
  this.searchMoreOption = message[3];
  if (this.displayMode === 'searchWiev') {
    this.displaySearch(message);
  }
  if (this.displayMode === 'listWiev') {
    this.displayList();
}
}
searchMore() {

  this.searchPage++;

  this.omdbService.search(this.searchPage, this.searchWord).then(results => {
    this.searchResults = results;
    console.log(results);
    for (let i = 0; i < this.searchResults.length; i++) {
      this.results.push(this.searchResults[i]);
    }
    console.log(this.results);
    this.selectionMade = true;
  });
}

  toList(result) {
    result.inList = !result.inList;
    if (result.inList === true) {
        this.favCount = 1;
        const movie = new ListItem (result.Title, result.Year, result.Poster, result.imdbID);
        this.list.addMovie(movie);
        console.log(this.list);
        this.listService.sendList(this.list);
    } else {
      this.favCount = -1;
      this.list.deleteMovie(result.Title);
      console.log(this.list);
      this.listService.sendList(this.list);
    }
    this.counterService.sendFavCount( this.favCount );
  }

  displaySearch(message) {
    if (this.selectionMade === false ) {
      this.results = message[0];
    console.log( this.results );
    if ( this.results ) {
    this.selectionMade = true;
    this.searchWord = message[2];
  }
  } else {
      this.results = this.results + message[0];
  }
  for (let i = 0; i < this.results.length; i++) {
    for (let j = 0; j < this.list.movies.length; j++) {
      if (this.results[i].imdbID === this.list.movies[j].imdbID) {
        this.results[i].inList = true;
      }
  }
}
  }
  displayList() {
    this.results = [];
    for (let i = 0; i < this.list.movies.length; i++) {
      const result = new Result(this.list.movies[i].poster, this.list.movies[i].title, '', this.list.movies[i].year, '', true);
      this.results.push(result);
  }
  this.selectionMade = true;
  console.log(this.results);

}

}
