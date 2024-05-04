import { Component } from '@angular/core';
import { MobileFunctionalitiesService } from '../../services/mobile-functionalities.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './take-photo.component.html',
  styleUrl: './take-photo.component.scss',
})
export class TakePhotoComponent {
  capturedImage: any;
  currentFacingMode: 'user' | 'environment' = 'user'; // Default to front camera

  constructor(
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {}

  takePhoto() {
    this.mobileFunctionalitiesService
      .takeCameraPhoto(this.currentFacingMode)
      .then((blob) => {
        this.capturedImage = URL.createObjectURL(blob);
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  }

  toggleCamera() {
    this.currentFacingMode =
      this.currentFacingMode === 'user' ? 'environment' : 'user';
  }
}
