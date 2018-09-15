import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { isNgTemplate } from '../../../../node_modules/@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db.list('/categories').snapshotChanges()
    .pipe(
      map(categories => {
        return categories.map(category => {
          const key = category.payload.key;
          const val = category.payload.val();
          return { key, val };
        });
      })
    );
  }
}
