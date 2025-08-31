import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ShowDetails } from './show-details/show-details';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'details/:id', component: ShowDetails }
];
