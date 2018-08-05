import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('showActions') showActions = true;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

}
