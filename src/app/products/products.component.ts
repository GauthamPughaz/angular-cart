import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts = [];
  category: string;

  constructor(productService: ProductService, route: ActivatedRoute) {
    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.val.category === this.category) : this.products;
    });
  }

  ngOnInit() {
  }

}
