import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 import { HttpClientModule} from '@angular/common/http';
 import { APP_ROUTING } from './app.routes';
 import { AppComponent } from './app.component';
import { NavbarComponent } from './components/searcher/shared/navbar/navbar.component';
import { SearchHomeComponent } from './components/searcher/searchHome/searchHome.component';
import { OmdbService } from './services/searchServices/omdb.service';
import { MovieComponent } from './components/searcher/movie/movie.component';
import { HttpClient } from 'selenium-webdriver/http';
import { VoteComponent } from './components/vote/voteStart/vote.component';
import { VoteRoundsComponent } from './components/vote/voteRounds/voteRounds.component';
import { GnapiService } from './services/searchServices/gnapi.service';
import { ModalsComponent } from './components/directives/modals/modals.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchHomeComponent,
    MovieComponent,
    VoteComponent,
    VoteRoundsComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING

  ],
  providers: [OmdbService, NavbarComponent, VoteComponent, GnapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
