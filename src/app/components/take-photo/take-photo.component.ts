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

  constructor(
    private mobileFunctionalitiesService: MobileFunctionalitiesService,
  ) {}

  takePhoto() {
    this.mobileFunctionalitiesService
      .takeFrontCameraPhoto()
      .then((blob) => {
        this.capturedImage = URL.createObjectURL(blob);
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  }
}
