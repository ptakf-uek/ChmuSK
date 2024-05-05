import { Component } from '@angular/core';
import { TakePhotoComponent } from '../take-photo/take-photo.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

import { MatButtonModule } from '@angular/material/button';
import { CreationSheetComponent } from '../creation-sheet/creation-sheet.component';
import { FileElementComponent } from '../file-element/file-element.component';
import { FolderElementComponent } from '../folder-element/folder-element.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openCreationSheet(): void {
    this._bottomSheet.open(CreationSheetComponent);
  }
}
