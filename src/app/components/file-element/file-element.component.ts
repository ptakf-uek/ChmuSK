import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-file-element',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './file-element.component.html',
  styleUrl: './file-element.component.scss',
})
export class FileElementComponent implements OnInit {
  @Input()
  fileData: any = {};

  @Output()
  changeFilenameEvent = new EventEmitter<any>();
  @Output()
  deleteFileEvent = new EventEmitter<any>();

  fileSize: number = 0;
  fileUrl: string = '';
  lastModifiedDate: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getFileSize();
    this.getFileLastModifiedDate();
    this.getFileUrl();
  }

  changeFilename(): void {
    this.changeFilenameEvent.emit(this.fileData);
  }

  deleteFile(): void {
    this.deleteFileEvent.emit(this.fileData);
  }

  getFileSize() {
    // Get file size from storage
    this.storageService.getFileSize(this.fileData).then((fileSize) => {
      this.fileSize = fileSize;
      this.fileData.size = fileSize;
    });
  }

  getFileLastModifiedDate() {
    // Get file size from storage
    this.storageService
      .getFileLastModifiedDate(this.fileData)
      .then((lastModifiedDate) => {
        this.lastModifiedDate = lastModifiedDate;
        this.fileData.lastModified = lastModifiedDate;
      });
  }

  getFileUrl() {
    // Get file access URL from storage
    this.storageService.getFileUrl(this.fileData).then((fileUrl) => {
      this.fileUrl = fileUrl;
    });
  }
}
