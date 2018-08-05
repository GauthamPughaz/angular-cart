import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: {key: String, val: Product} = {key: '', val: {} as Product};
  id: String;

  constructor(categoryService: CategoryService, private productService: ProductService, route: ActivatedRoute, private router: Router) {
    this.categories$ = categoryService.getAll();
    this.id = route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).pipe(
        take(1)
      ).subscribe(item => {
        this.product.key = this.id;
        this.product.val = item as Product;
      });
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
