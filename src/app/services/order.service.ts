import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService, private db: AngularFireDatabase) { }

  public async placeOrder(order: any) {
    const placedOrder = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return placedOrder;
  }

  getAllOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUserId(userId) {
    return this.db.list('/orders', ref => {
      return ref.orderByChild('userId').equalTo(userId);
    }).valueChanges();
  }
}
