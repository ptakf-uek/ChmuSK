import { Injectable } from '@angular/core';
import { Storage, deleteObject, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  deleteFile(file: any) {
    // Delete file from storage
    const fileStorageId = `${file['id']}.${file['filename'].split('.')[1]}`;
    deleteObject(ref(this.storage, fileStorageId));
  }
}
