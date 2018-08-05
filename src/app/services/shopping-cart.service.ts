import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { take } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: (new Date()).getTime()
    });
  }

  private getCart(cartId) {
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId();
    const item_ = this.getItem(cartId, product.key);
    item_.valueChanges().pipe(
      take(1)
    ).subscribe((item: {product: {}, quantity: number}) => {
      item_.set({product: product, quantity: (item) ? item.quantity + 1 : 1});
    });
  }
}
