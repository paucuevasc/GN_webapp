import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../shared/omdb.service';
import { DisplayService } from '../../../shared/display.service';
import { debounceTime } from 'rxjs/operators';
import { CounterService } from '../../../shared/counter.service';
import { Subscription } from 'rxjs/Subscription';
import { ListService } from '../../../shared/list.service';
import { ListItem, List } from '../../shared/models';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent {

favCounter = 0;
subscription: Subscription;
listSubscription: Subscription;
searchWord;
searchMoreOption: boolean;
selectionMade = false;
list = new List([]);
displayMode;

  constructor(private omdbService: OmdbService,
    private displayService: DisplayService,
    private counterService: CounterService,
    private listService: ListService) {
      this.subscription =
                this.counterService.getFavCounter().subscribe((favCounter) => {
                  this.favCounter = favCounter;
              });
      this.listSubscription =
                this.listService.getList().subscribe((list) => {
                  this.list = list;
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
    this.displayMode = 'searchWiev';
    const message = [this.searchResults, this.selectionMade, this.searchWord, this.searchMoreOption, this.displayMode];
    console.log( message );
    this.displayService.sendMessage( message );
  }
viewList() {
  this.displayMode = 'listWiev';
  const message = [this.list.movies.length, this.selectionMade, '', false, this.displayMode];
  console.log( message );
  this.displayService.sendMessage( message );

}




}
