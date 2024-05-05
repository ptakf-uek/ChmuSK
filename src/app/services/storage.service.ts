import { Injectable } from '@angular/core';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

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

  async addFile(blob: any, file: any) {
    // Get file size metadata from storage
    const fileStorageId = `${file['id']}.${file['filename'].split('.')[1]}`;
    uploadBytes(ref(this.storage, fileStorageId), blob);
  }

  async getFileSize(file: any) {
    // Get file size metadata from storage
    const fileStorageId = `${file['id']}.${file['filename'].split('.')[1]}`;
    return (await getMetadata(ref(this.storage, fileStorageId))).size;
  }

  async getFileLastModifiedDate(file: any) {
    // Get file last modified metadata from storage
    const fileStorageId = `${file['id']}.${file['filename'].split('.')[1]}`;
    return (await getMetadata(ref(this.storage, fileStorageId))).updated;
  }

  async getFileUrl(file: any) {
    const fileStorageId = `${file['id']}.${file['filename'].split('.')[1]}`;
    return await getDownloadURL(ref(this.storage, fileStorageId));
  }
}
