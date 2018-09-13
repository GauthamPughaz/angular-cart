import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('shoppingCart') shoppingCart: ShoppingCart;
  userId: string;
  checkoutInformation: any = {};
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.checkoutInformation, this.shoppingCart.items);
    const placedOrder = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', placedOrder.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
