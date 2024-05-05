import { Injectable } from '@angular/core';
import { Firestore, addDoc, getDocs, setDoc } from '@angular/fire/firestore';
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

  async addFile(file: string) {
    const userData: any = await this.getUserData();
    const fileList: string[] = await this.getFileList();

    getDocs(collection(this.database, 'userFiles')).then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        if (document.data()['userId'] === userData['id']) {
          fileList.push(file);
          console.log(fileList);

          setDoc(doc(this.database, 'userFiles', document.id), {
            fileList: fileList,
            id: document.get('id'),
            userId: document.get('userId'),
          });
        }
      });
    });
  }

  async getFileList() {
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
