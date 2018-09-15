import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserModel } from 'shared/models/app-user.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: UserModel;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
    authService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
