import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../../../services/searchServices/omdb.service';
import { DisplayService } from '../../../../services/searchServices/display.service';
import { debounceTime } from 'rxjs/operators';
import { VoteListService } from '../../../../services/searchServices/voteList.service';
import { Subscription } from 'rxjs/Subscription';
import { ListService } from '../../../../services/searchServices/list.service';
import { ListItem, List } from '../../shared/models';
import { Router } from '@angular/router';



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
    private router: Router ) {
      // this.subscription =
                // this.counterService.getFavCounter().subscribe((favCounter) => {
                  // this.favCounter = favCounter;
             // });
             debugger;
      this.listSubscription =
               this.listService.getList().subscribe((list) => {
               this.list = list;
                this.favCounter = this.list.movies.length;
              });

              if ( this.list.movies.length <= 0 ) {
                debugger;
                this.list = this.voteListService.getList();
                this.favCounter = this.list.movies.length;
                // this.selectionMade = true;
                // this.viewList();
              }
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
  debugger;
  this.displayMode = 'listWiev';
  const message = [this.list.movies, this.selectionMade, '', false, this.displayMode];
  console.log( message );
  this.displayService.sendMessage( message );

}
saveList() {
  this.voteListService.sendList(this.list);
  this.router.navigate( ['/vote']);
}
ngOnInit () {
  // if (!this.list) { this.list = new List([]); }
  // debugger;
 // this.list = this.voteListService.getList();
  // this.favCounter = this.list.movies.length;

   // console.log(this.list);

}


}
