import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIcon } from '@angular/material/icon';
import { FileListComponent } from '../file-list/file-list.component';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

import { NgTemplateOutlet } from '@angular/common';
import { waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { MobileFunctionalitiesService } from '../../services/mobile-functionalities.service';
import { StorageService } from '../../services/storage.service';
import { generateId } from '../../utils/utils';
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
    NgTemplateOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef!: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef!: TemplateRef<any>;

  capturedImage: any;
  currentFacingMode: 'user' | 'environment' = 'user'; // Default to front camera

  constructor(
    private router: Router,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  rerenderFileList() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  addFolderFromInput(): void {
    console.log('Folder created!');
  }

  addFileFromInput(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // If file was uploaded, add it to the file list
      this.addFile(file, {
        filename: file.name,
        folder: '',
        id: generateId(),
        isPrivate: true,
        tag: 'Personal',
        lastModified: new Date().toString(),
        size: file.size,
      });
    }
  }

  takePhoto() {
    // Get current location
    this.mobileFunctionalitiesService
      .getCurrentLocation()
      .then((currentLocation) => {
        // Take a photo
        this.mobileFunctionalitiesService
          .takeCameraPhoto(this.currentFacingMode)
          .then((blob) => {
            this.addFile(blob, {
              filename: Date.now() + '.jpg',
              folder: '',
              id: generateId(),
              isPrivate: true,
              tag: 'Personal',
              lastModified: new Date().toString(),
              size: blob.size,
              location: currentLocation.toString(),
            });
          })
          .catch((error) => {
            console.error('Error capturing image:', error);
          });
      });
  }

  addFile(blob: any, file: any) {
    // Add a file to the database
    this.databaseService.addFile(file).then(() => {
      // Add a file to the storage
      this.storageService.addFile(blob, file).then(() => {
        // Rerender the file list

        this.rerenderFileList();
      });
    });

    // Vibrate device
    this.mobileFunctionalitiesService.vibratePhone(100);
  }
}
