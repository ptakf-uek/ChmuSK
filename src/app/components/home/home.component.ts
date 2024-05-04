import { Component } from '@angular/core';
import { TakePhotoComponent } from '../take-photo/take-photo.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

import { MatButtonModule } from '@angular/material/button';
import { CreationSheetComponent } from '../creation-sheet/creation-sheet.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TakePhotoComponent,
    SearchBarComponent,
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
