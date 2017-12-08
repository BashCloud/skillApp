import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }
  googleLogin() {
    console.log("hh");
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user,credential.user.displayName);
      })
  }
  private updateUserData(user,userName) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: userName,
      photoURL: user.photoURL
    }
    return userRef.set(data)
  }
  emailSignUp(email:string, password:string,userName:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.authState = user
        user.updateProfile({
          displayName:userName
        })
        // .then( function(){
          this.updateUserData(user,userName);
          localStorage.setItem('isLoggedIn','true');
          this.router.navigate(['/']);
        // })
      })
      .catch(error => console.log(error));
  }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this._service.success(
        //   'Login Successfull',
        //   'Welcome back to Digi Suchna...',
        //   {
        //       timeOut: 3000,
        //       showProgressBar: false,
        //       pauseOnHover: true,
        //       clickToClose: true,
        //       maxLength: 10
        //   }
        // )
        // console.log("User Loggedin successfully..." + user.email);
        this.updateUserData(user,user.displayName);
        localStorage.setItem('isLoggedIn','true')
        this.router.navigate(['/']);
      })
      .catch(error => {
        // this._service.error(
        //   'Login Failes',
        //   error.message,
        //   {
        //       timeOut: 3000,
        //       showProgressBar: false,
        //       pauseOnHover: true,
        //       clickToClose: true,
        //       maxLength: 10
        //   }
        // )
        console.log(error)
      });
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}