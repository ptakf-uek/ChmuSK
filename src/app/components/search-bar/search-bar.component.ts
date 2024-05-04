import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { filesList } from '../../data/filesList';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatIcon, MatIconButton, FormsModule, NgFor],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchText: string = '';
  filteredFiles: any[];

  constructor() {
    this.filteredFiles = filesList;
  }

  filterFiles() {
    this.filteredFiles = filesList.filter((file) =>
      file.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }
}
