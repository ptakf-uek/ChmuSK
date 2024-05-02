import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { filesList } from '../../data/filesList';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'search-bar',
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
