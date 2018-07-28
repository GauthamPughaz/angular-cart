import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserModel } from '../models/app-user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(userId: String): Observable<UserModel> {
    return this.db.object('/users/' + userId).valueChanges().pipe(
      map((user: UserModel) => user)
    );
  }
}
