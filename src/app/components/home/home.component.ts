import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { FileElementComponent } from '../file-element/file-element.component';
import { FolderElementComponent } from '../folder-element/folder-element.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TakePhotoComponent,
    MatIcon,
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
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  addFolderInput(): void {
    console.log('Folder created!');
  }

  addFileInput(): void {
    console.log('File added!');
  }

  addFile(file: string) {
    this.databaseService.addFile(file);
  }

  getFileList() {
    this.databaseService.getFileList().then((data) => {
      console.log(data);
    });
  }
}
