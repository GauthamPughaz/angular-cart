import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product.model';
import { DataTableResource } from '../../../../../node_modules/angular-4-data-table-fix';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: {key: string, val: Product}[];
  tableResource: DataTableResource<{key: string, val: Product}>;
  items: {key: string, val: Product}[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  initializeTable(products) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.count().then(count => {
      this.itemCount = count;
    });
    const offset = products.length > 10 ? products.length - 10 : 0;
    this.tableResource.query({ offset: offset }).then(items => this.items = items);
  }

  ngOnInit() {
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }
    this.tableResource.query(params).then(items => this.items = items);
  }

  filter(query) {
    const filteredProducts = (query) ? this.products.filter(p => p.val.title.toLowerCase().match(query.toLowerCase())) : this.products;
    this.initializeTable(filteredProducts);
  }

}
