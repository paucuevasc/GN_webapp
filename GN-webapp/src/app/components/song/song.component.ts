import { Component, Input, OnInit } from '@angular/core';
import { OmdbService } from '../../shared/omdb.service';
import { DisplayService } from '../../shared/display.service';
import { CounterService } from '../../shared/counter.service';

import { Subscription } from 'rxjs/Subscription';

export class Message {
  artistId: number;
  selectedArtist: string;
  selectionMade: boolean;

  constructor(artistId: number, selectedArtist: string, selectionMade: boolean) {
    this.artistId = artistId;
    this.selectedArtist = selectedArtist;
    this.selectionMade = selectionMade;
  }
}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  providers: [OmdbService],
  styleUrls: ['./song.component.scss']
})
export class SongComponent {
receivedMessage: Message;
selectionMade = false;
subscription: Subscription;
title: string;
year: string;
poster: string;
favCount: number;
Results;
searchResults;
searchPage = 1;
searchWord;


  constructor(private omdbService: OmdbService,
              private counterService: CounterService,
              private displayService: DisplayService) {
                this.subscription =
                this.displayService.getMessage().subscribe((message) => {
                  this.selectionMade = message[1];

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
songResults = [];


searchMore() {

  this.searchPage++;
  debugger;
  this.omdbService.search(this.searchPage, this.searchWord).then(results => {
    debugger;
    this.searchResults = results;
    console.log(results);
    for (let i = 0; i < this.searchResults.length; i++) {
      this.Results.push(this.searchResults[i]);
    }
    console.log(this.Results);
    this.selectionMade = true;
  });
}

  toFavorites(result) {
    result.favorite = !result.favorite;
    if (result.favorite === true) {
        this.favCount = 1;
    } else {
      this.favCount = -1;
    }
    this.counterService.sendFavCount( this.favCount );
  }
}


