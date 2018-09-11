import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{
  checkoutInformation: any = {};
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    const order = {
      datePlaced: new Date().getTime(),
      shippingInfo: this.checkoutInformation,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
  }
}
