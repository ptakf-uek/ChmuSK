import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { TakePhotoComponent } from './components/take-photo/take-photo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInFormComponent },
  { path: 'signup', component: SignUpFormComponent },
  { path: 'search-bar', component: SearchBarComponent },
  { path: 'take-photo', component: TakePhotoComponent },
];
