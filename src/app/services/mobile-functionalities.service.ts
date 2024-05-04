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

  // Function to take a photo with the front camera
  takeFrontCameraPhoto(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'user' } })
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
