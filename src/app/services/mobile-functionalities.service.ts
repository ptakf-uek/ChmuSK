import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileFunctionalitiesService {
  constructor() {}

  vibratePhone(duration: number) {
    // Vibrate the phone
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    } else {
      console.warn('Vibration not supported');
    }
  }

  getCurrentLocation(): Promise<GeolocationCoordinates> {
    // Get current geolocation
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

  takeCameraPhoto(facingMode: 'user' | 'environment'): Promise<Blob> {
    // Take a photo with the front camera
    return new Promise((resolve, reject) => {
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: facingMode } })
          .then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const context = canvas.getContext('2d');
              if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                stream.getVideoTracks().forEach((track) => track.stop());
                canvas.toBlob((blob) => {
                  if (blob) {
                    resolve(blob);
                  } else {
                    reject(new Error('Failed to capture image'));
                  }
                }, 'image/jpeg');
              } else {
                reject(new Error('Failed to create canvas context'));
              }
            };
            video.play();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('MediaDevices or getUserMedia not supported'));
      }
    });
  }
}
