import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../enviroments/api-url';
import { ProductsListMViewModel } from '../../products/models/products-list.model';
import { forkJoin, map } from 'rxjs';
import { OrderProductModel, OrderViewModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  // Fetch Products
  getProducts() {
    return this.http.get<ProductsListMViewModel[]>(ApiUrl.products);
  }

  getOrders(){
    return this.http.get<OrderViewModel[]>(ApiUrl.orders);
  }

  getOrdersWithProductDetails(){
    return forkJoin({
      orders:this.getOrders(),
      products:this.getProducts()
    }).pipe(
      map(({orders,products})=>{
        return orders.map((order) => {
          const orderProducts = order.Products.map((product:OrderProductModel)=>{
            const productDetails = products.find((p) => p.ProductId === product.ProductId);
            return {
              ...product,
              ProductName: productDetails?.ProductName,
              ProductPrice: productDetails?.ProductPrice || 0,
            };
          })
          const totalPrice = orderProducts.reduce((sum, current) => sum + current.Quantity * current.ProductPrice, 0);

          return {
            ...order,
            Products: orderProducts,
            totalPrice,
          };
        })
      })
    )
  }

  getOrderDetails(orderId:number){
    return this.http.get<OrderViewModel[]>(`${ApiUrl.orderDetails}${orderId}`);
  }
}
