import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Logged in user data
  userId: string = '';
  googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    // Get authentication state
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        // If logged in, save user data to Local Storage
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        // If logged out, remove user data
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  getUserFromFirebase() {
    // Get authenticated user from Firebase
    return this.auth.currentUser;
  }

  getUserFromLocalStorage() {
    // Get authenticated user from Local Storage
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);

    return user;
  }

  isLoggedIn(): boolean {
    // Check if user is logged in or out
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);

    return user !== null ? true : false;
  }

  signUpWithEmail(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        const user = result.user;

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logInWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        const user = result.user;

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logInWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)!;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)!;
      });
  }
}
