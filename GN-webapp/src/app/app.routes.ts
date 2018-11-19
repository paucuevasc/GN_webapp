import { RouterModule, Routes } from '@angular/router';
import { SearchHomeComponent } from './components/searcher/searchHome/searchHome.component';
import { VoteComponent } from './components/vote/vote.component';


const APP_ROUTES: Routes = [
    {path: 'search-home', component: SearchHomeComponent},
    {path: 'vote', component: VoteComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'vote' }

];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
