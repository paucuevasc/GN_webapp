import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../shared/omdb.service';
import { DisplayService } from '../../../shared/display.service';
import { debounceTime } from 'rxjs/operators';
import { CounterService } from '../../../shared/counter.service';
import { Subscription } from 'rxjs/Subscription';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent {

favCounter = 0;
subscription: Subscription;
searchWord;
searchMoreOption: boolean;
selectionMade = false;

  constructor(private omdbService: OmdbService,
    private displayService: DisplayService,
    private counterService: CounterService) {
      this.subscription =
                this.counterService.getFavCounter().subscribe((favCounter) => {
                  this.favCounter = favCounter;
              });
    }


  searchResults = [];


  search(searchPage, searchWord) {
    this.searchWord = searchWord;
    this.selectionMade = false;
    this.omdbService.search(searchPage, searchWord).then(results => {
      this.searchResults = results;
      console.log(results);
      this.showResults();
    });
  }
  showResults() {
    this.searchMoreOption = true;
    const message = [this.searchResults, this.selectionMade, this.searchWord, this.searchMoreOption];
    console.log( message );
    this.displayService.sendMessage( message );


  }





}
