import { Component } from '@angular/core';
import { TakePhotoComponent } from '../take-photo/take-photo.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

import { MatButtonModule } from '@angular/material/button';
import { FileElementComponent } from '../file-element/file-element.component';
import { FolderElementComponent } from '../folder-element/folder-element.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TakePhotoComponent,
    SearchBarComponent,
    FileElementComponent,
    FolderElementComponent,
    MatButtonModule,
    MatBottomSheetModule,
    MatMenuModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  createNewFolder(): void {
    console.log('Folder created!');
  }

  addNewFile(): void {
    console.log('File added!');
  }
}
