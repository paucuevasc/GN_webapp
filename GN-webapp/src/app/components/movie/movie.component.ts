import { Component, Input, OnInit } from '@angular/core';
import { OmdbService } from '../../shared/omdb.service';
import { DisplayService } from '../../shared/display.service';
import { CounterService } from '../../shared/counter.service';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  providers: [OmdbService],
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

selectionMade = false;
subscription: Subscription;
title: string;
year: string;
poster: string;
favCount: number;
list = [];
Results;
searchResults;
searchPage = 1;
searchWord;
searchMoreOption = false;


  constructor(private omdbService: OmdbService,
              private counterService: CounterService,
              private displayService: DisplayService) {
                this.subscription =
                this.displayService.getMessage().subscribe((message) => {
                  this.selectionMade = message[1];
                  this.searchMoreOption = message[3];

                  if (this.selectionMade === false ) {
                    this.Results = message[0];
                  console.log( this.Results );

                  if ( this.Results ) {
                  this.selectionMade = true;
                  this.searchWord = message[2];
                }
                } else {
                    this.Results = this.Results + message[0];
                }
                });
               }



searchMore() {

  this.searchPage++;

  this.omdbService.search(this.searchPage, this.searchWord).then(results => {
    this.searchResults = results;
    console.log(results);
    for (let i = 0; i < this.searchResults.length; i++) {
      this.Results.push(this.searchResults[i]);
    }
    console.log(this.Results);
    this.selectionMade = true;
  });
}

  toList(result) {
    debugger;
    result.favorite = !result.favorite;
    if (result.favorite === true) {
        this.favCount = 1;
        debugger;
        this.list.push(result);
        console.log(this.list);
    } else {
      this.favCount = -1;
    }
    this.counterService.sendFavCount( this.favCount );
  }
}


