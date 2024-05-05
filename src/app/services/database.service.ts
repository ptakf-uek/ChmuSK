import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { User } from '../models/user';
import { generateId } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private database: Firestore,
    private authService: AuthService,
  ) {}

  addUser(user: User) {
    // Add user to the userData collection in the database
    addDoc(collection(this.database, 'userData'), {
      displayName: user.displayName,
      driveSize: 1,
      email: user.email,
      id: user.id,
    });

    addDoc(collection(this.database, 'userFiles'), {
      fileList: [],
      id: generateId(),
      userId: user.id,
    });
  }

  async getUserData() {
    // Get user from the userData collection in the database
    return getDocs(collection(this.database, 'userData')).then(
      (querySnapshot) => {
        let userData: object = {};

        querySnapshot.forEach((doc) => {
          if (
            doc.data()['email'] ===
            this.authService.getUserFromLocalStorage().email
          ) {
            userData = doc.data();
          }
        });

        return userData;
      },
    );
  }

  async addFile(file: any) {
    // Add to a file to the userFiles collection in the database
    const userData: any = await this.getUserData();
    const fileList: any[] = await this.getFileList();

    getDocs(collection(this.database, 'userFiles')).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        if (document.data()['userId'] === userData['id']) {
          fileList.push(file);

          setDoc(doc(this.database, 'userFiles', document.id), {
            fileList: fileList,
            id: document.get('id'),
            userId: document.get('userId'),
          });
        }
      });
    });
  }

  async changeFilename(file: any) {
    // Change the name of a file in the userFiles collection in the database
    const userData: any = await this.getUserData();
    const fileList: any[] = await this.getFileList();

    getDocs(collection(this.database, 'userFiles')).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        if (document.data()['userId'] === userData['id']) {
          const newFileList = fileList.filter(
            (fileData) => fileData.id != file.id,
          );
          newFileList.push(file);

          updateDoc(doc(this.database, 'userFiles', document.id), {
            fileList: newFileList,
          });
        }
      });
    });
  }

  async deleteFile(file: any) {
    // Delete a file from the userFiles collection in the database
    const userData: any = await this.getUserData();
    const fileList: any[] = await this.getFileList();

    getDocs(collection(this.database, 'userFiles')).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        if (document.data()['userId'] === userData['id']) {
          const newFileList = fileList.filter(
            (fileData) => fileData.id != file.id,
          );

          updateDoc(doc(this.database, 'userFiles', document.id), {
            fileList: newFileList,
          });
        }
      });
    });
  }

  async getFileList() {
    // Get a list of files from the userFiles collection in the database
    const userData: any = await this.getUserData();

    return getDocs(collection(this.database, 'userFiles')).then(
      (querySnapshot) => {
        let fileList: [] = [];

        querySnapshot.forEach((document) => {
          if (document.data()['userId'] === userData['id']) {
            fileList = document.data()['fileList'];
          }
        });

        return fileList;
      },
    );
  }
}
