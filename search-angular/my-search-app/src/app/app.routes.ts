import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EntryComponent } from './entry/entry.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'entry', component: EntryComponent },
];
