import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { FileElementComponent } from '../file-element/file-element.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIcon, MatIconButton, FormsModule, NgFor, FileElementComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  searchText: string = '';
  fileList: any[] = [];
  filteredFiles: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    this.getFileList();
  }

  filterFiles() {
    this.filteredFiles = this.fileList.filter((file) =>
      file.filename.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  getFileList() {
    this.databaseService.getFileList().then((data) => {
      this.fileList = data;
      this.filteredFiles = this.fileList;
    });
  }

  changeFilename(fileData: any) {
    this.databaseService.changeFilename(fileData);

    this.getFileList();
  }
}
