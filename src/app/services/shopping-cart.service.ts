import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { take } from '../../../node_modules/rxjs/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return (<Observable<ShoppingCart>> this.db.object('/shopping-carts/' + cartId).valueChanges()).pipe(
      map(x => new ShoppingCart(x.items as any))
    );
  }

  addToCart(product) {
    this.updateShoppingCart(product, 1);
  }

  removeFromCart(product) {
    this.updateShoppingCart(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: (new Date()).getTime()
    });
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

  async updateShoppingCart(product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item_ = this.getItem(cartId, product.key);
    item_.valueChanges().pipe(
      take(1)
    ).subscribe((item: any) => {
      const quantity = (item) ? item.quantity + change : 1;
      if (quantity === 0) {
        item_.remove();
      } else {
        item_.set({
          title: product.title || product.val.title,
          price: product.price || product.val.price,
          imageUrl: product.imageUrl || product.val.imageUrl,
          quantity: quantity
        });
      }
    });
  }
}
