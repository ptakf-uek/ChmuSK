import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { TakePhotoComponent } from './components/take-photo/take-photo.component';
import { FileElementComponent } from './components/file-element/file-element.component';
import { FolderElementComponent } from './components/folder-element/folder-element.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LogInFormComponent },
  { path: 'signup', component: SignUpFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search-bar', component: FileListComponent },
  { path: 'take-photo', component: TakePhotoComponent },
  { path: 'file-element', component: FileElementComponent },
  { path: 'folder-element', component: FolderElementComponent },
];
