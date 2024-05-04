import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileFunctionalitiesService {
  constructor() {}

  // Function to vibrate the phone
  vibratePhone(duration: number) {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    } else {
      console.warn('Vibration not supported');
    }
  }

  // Function to get current geolocation
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          },
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  }
}
