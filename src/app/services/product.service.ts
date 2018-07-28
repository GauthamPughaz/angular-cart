import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(items => {
        return items.map(item => {
          const key = item.payload.key;
          const val = item.payload.val() as Product;
          return { key, val };
        });
      })
    );
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
