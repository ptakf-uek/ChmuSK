import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { filesList } from '../../data/filesList';
import { MobileFunctionalitiesService } from '../../mobile-functionalities.service'; // Temporarily

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

  constructor(
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {
    this.filteredFiles = filesList;
  }

  filterFiles() {
    this.filteredFiles = filesList.filter((file) =>
      file.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  triggerMobileFunctionalities() {
    this.mobileFunctionalitiesService.vibratePhone(1000);

    this.mobileFunctionalitiesService
      .getCurrentLocation()
      .then((coords) => {
        console.log('Latitude:', coords.latitude);
        console.log('Longitude:', coords.longitude);
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      });
  }
}
