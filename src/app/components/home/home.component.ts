import { Component } from '@angular/core';
import { TakePhotoComponent } from '../take-photo/take-photo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TakePhotoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
