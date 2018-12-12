import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../../services/searchServices/omdb.service';
import { DisplayService } from '../../../../services/searchServices/display.service';
import { debounceTime } from 'rxjs/operators';
import { VoteListService } from '../../../../services/searchServices/voteList.service';
import { Subscription } from 'rxjs/Subscription';
import { ListService } from '../../../../services/searchServices/list.service';
import { ListItem, List } from '../../shared/models';
import { Router } from '@angular/router';
import { GnapiService } from '../../../../services/searchServices/gnapi.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent implements OnInit {

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
    private voteListService: VoteListService,
    private listService: ListService,
    private gnapiService: GnapiService,
    private router: Router ) {
      this.listSubscription =
               this.listService.getList().subscribe((list) => {
               this.list = list;
                this.favCounter = this.list.movies.length;
              });

              if ( this.list.movies.length <= 0 ) {
                this.list = this.voteListService.getList();
                if ( this.list.movies === undefined ) {
                  this.favCounter = 0;
                } else {  this.favCounter = this.list.movies.length; }
              }
   }


  searchResults = [];

  // Make a search.
  search(searchPage, searchWord) {
    this.searchWord = searchWord;
    this.selectionMade = false;
    this.omdbService.search(searchPage, searchWord).then(results => {
      this.searchResults = results;
      console.log(results);
      this.showResults();
    });
  }

  // Send the result of a search in order to display.
  showResults() {
    this.searchMoreOption = true;
    this.displayMode = 'searchWiev';
    const message = [this.searchResults, this.selectionMade, this.searchWord, this.searchMoreOption, this.displayMode];
    console.log( message );
    this.displayService.sendMessage( message );
  }

  // Send the current list in order to display.
viewList() {
  this.displayMode = 'listWiev';
  const message = [this.list.movies, this.selectionMade, '', false, this.displayMode];
  console.log( message );
  this.displayService.sendMessage( message );

}

  // Update the current list.
saveList() {
  this.voteListService.sendList(this.list);
  this.router.navigate( ['/vote']);
  console.log(this.list);
  this.gnapiService.addList(this.list);
}
ngOnInit () {


}


}
