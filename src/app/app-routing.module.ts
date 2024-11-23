import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'products',
        pathMatch:'full'
      },
      {
        path: 'products',
        loadChildren:
          () => import('./core/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'orders',
        loadChildren:
          () => import('./core/orders/orders.module').then(m => m.OrdersModule)
      }      
    ]
  },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
