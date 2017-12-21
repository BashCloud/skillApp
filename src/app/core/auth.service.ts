import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { NotificationsService } from 'angular2-notifications';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}
@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private _notify: NotificationsService,
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
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.oAuthLogin(provider);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.router.navigate(['/']);
        localStorage.setItem('isLoggedIn','true');
        console.log('welcome');
        this._notify.success(
          'Login Successfull',
          'Welcome back to the Portal...',
        )     
        this.updateUserData(credential.user,credential.user.displayName);
      })
  }
  private updateUserData(user,userName) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    var URL = user.photoURL?user.photoURL:"assets/dummyUser.png";
    localStorage.setItem('UID',user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: userName,
      photoURL: URL
    }
    userRef.collection('skills');
    return userRef.set(data)
  }
  emailSignUp(email:string, password:string,userName:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.authState = user
        user.updateProfile({
          displayName:userName,
          photoURL:"assets/dummyUser.png"
        })
        this._notify.success(
          'Registration Successfull',
          'Welcome to the Portal...',
        )
          this.updateUserData(user,userName);
          localStorage.setItem('isLoggedIn','true');
          this.router.navigate(['/']);
      })
      .catch(error => {
        this._notify.error(
          'Registration Failed !!',
          error.message,
        )
        console.log(error)}
      );
  }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this._notify.success(
          'Login Successfull',
          'Welcome back to the Portal...',
        )
        localStorage.setItem('isLoggedIn','true')
        this.router.navigate(['/']);
        this.updateUserData(user,user.displayName);
      })
      .catch(error => {
        this._notify.error(
          'Login Failed !!',
          error.message,
        )
        console.log(error)
      });
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("email sent")
        this._notify.success(
          'Reset Password',
          'Kindly check your mail',
        )
    })
      .catch((error) => {
        console.log(error)
        this._notify.error(
          'Error Occur !!',
          error.message,
        )
      })
  }
  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/login']);
        this._notify.success(
          'Successfully loged out',
          'You may close window safely...',
        )
    });
  }
}