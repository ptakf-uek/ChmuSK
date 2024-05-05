import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-creation-sheet',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './creation-sheet.component.html',
  styleUrl: './creation-sheet.component.scss',
})
export class CreationSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CreationSheetComponent>,
  ) {}

  createNewFolder(event: MouseEvent): void {
    console.log('Folder created!');
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  addNewFile(event: MouseEvent): void {
    console.log('File added!');
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
