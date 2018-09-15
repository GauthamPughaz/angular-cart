import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userId: String;
  orders$;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.orders$ = this.orderService.getOrdersByUserId(user.uid);
    });
  }

}
