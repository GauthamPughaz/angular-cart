import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { SharedModule } from './../shared/shared.module';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminGuardService } from './services/admin-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'admin/products', component: ManageProductsComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: 'admin/orders', component: ManageOrdersComponent, canActivate: [AuthGuardService, AdminGuardService] }
    ])
  ],
  declarations: [
    ProductFormComponent,
    ManageOrdersComponent,
    ManageProductsComponent
  ],
  providers: [
    AdminGuardService
  ]
})
export class AdminModule { }
