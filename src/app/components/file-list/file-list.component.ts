import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { MobileFunctionalitiesService } from '../../services/mobile-functionalities.service';
import { StorageService } from '../../services/storage.service';
import { FileElementComponent } from '../file-element/file-element.component';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [MatIcon, MatIconButton, FormsModule, NgFor, FileElementComponent],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss',
})
export class FileListComponent implements OnInit {
  searchText: string = '';
  fileList: any[] = [];
  filteredFiles: any[] = [];

  constructor(
    private databaseService: DatabaseService,
    private storageService: StorageService,
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {}

  ngOnInit(): void {
    this.getFileList();
  }

  filterFiles() {
    // Filter the file list to include only files with names matching the input text
    this.filteredFiles = this.fileList.filter((file) =>
      file.filename.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  getFileList() {
    // Get a list of files from the userFiles collection in the database
    this.databaseService.getFileList().then((data) => {
      this.fileList = data;
      this.filteredFiles = this.fileList;
    });
  }

  changeFilename(fileData: any) {
    // Change the name of a file
    this.databaseService.changeFilename(fileData).then(() => {
      this.getFileList();
    });
  }

  deleteFile(fileData: any) {
    // Delete reference to file from database
    this.databaseService.deleteFile(fileData).then(() => {
      this.getFileList();
    });

    // Delete file from storage
    this.storageService.deleteFile(fileData);

    // Vibrate device
    this.mobileFunctionalitiesService.vibratePhone(200);
  }
}
