import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserModel } from '../models/app-user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(result => this.router.navigate(['']));
  }

  get currentUser$(): Observable<UserModel> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
