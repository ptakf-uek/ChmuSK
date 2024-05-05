import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-file-element',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './file-element.component.html',
  styleUrl: './file-element.component.scss',
})
export class FileElementComponent {
  @Input()
  fileData: any = {};

  @Output()
  changeFilenameEvent = new EventEmitter<any>();
  @Output()
  deleteFileEvent = new EventEmitter<any>();

  changeFilename(): void {
    this.changeFilenameEvent.emit(this.fileData);
  }

  deleteFile(): void {
    this.deleteFileEvent.emit(this.fileData);
  }
}
