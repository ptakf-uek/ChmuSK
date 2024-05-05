import { Component, OnInit } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { FileListComponent } from '../file-list/file-list.component';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { MobileFunctionalitiesService } from '../../services/mobile-functionalities.service';
import { FileElementComponent } from '../file-element/file-element.component';
import { FolderElementComponent } from '../folder-element/folder-element.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TakePhotoComponent,
    MatIcon,
    FileListComponent,
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
  capturedImage: any;
  currentFacingMode: 'user' | 'environment' = 'user'; // Default to front camera

  fileList: any[] = [
    { filename: 'book1.pdf', id: 1, lastModified: '24-13-2033', size: 43243 },
    { filename: 'book2.pdf', id: 2, lastModified: '01-01-2045', size: 123 },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    // TODO: remove this:
    // this.addFile({
    //   filename: 'pic.jpg',
    //   folder: '',
    //   id: 'g34h45hj34',
    //   isPrivate: true,
    //   tag: 'Personal',
    //   type: 'image',
    //   lastModified: '23-43-4234',
    //   size: 34234,
    // });
  }

  addFolderFromInput(): void {
    console.log('Folder created!');
  }

  addFileFromInput(): void {
    console.log('File added!');
  }

  takePhoto() {
    // Take a photo
    this.mobileFunctionalitiesService
      .takeCameraPhoto(this.currentFacingMode)
      .then((blob) => {
        this.capturedImage = URL.createObjectURL(blob);
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  }

  addFile(file: any) {
    // Add a file to the database
    this.databaseService.addFile(file);
  }
}
