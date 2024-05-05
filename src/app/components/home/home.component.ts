import { Component } from '@angular/core';
import { TakePhotoComponent } from '../take-photo/take-photo.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

import { MatButtonModule } from '@angular/material/button';
import { CreationSheetComponent } from '../creation-sheet/creation-sheet.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TakePhotoComponent,
    SearchBarComponent,
    MatButtonModule,
    MatBottomSheetModule,
    MatMenuModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openCreationSheet(): void {
    this._bottomSheet.open(CreationSheetComponent);
  }

  changeName(): void {
    console.log('Name changed!');
  }

  deleteThing(): void {
    console.log('Thing deleted!');
  }
}
