import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../../../enviroments/api-url';
import { forkJoin, map } from 'rxjs';
import {  OrderProductModel, OrderViewModel } from '../models/order.model';
import { SharedDataService } from './../../../shared/services/shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private sharedService:SharedDataService) { }

  getOrders() {
    return this.http.get<OrderViewModel[]>(ApiUrl.orders);
  }

  getOrdersWithProductDetails() {
    return forkJoin({
      orders: this.getOrders(),
      products: this.sharedService.getProducts()
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
    );
  }

  getOrderDetails(orderId: number) {
    return this.http.get<OrderViewModel[]>(`${ApiUrl.orderDetails}${orderId}`);
  }

  getProductDetails(productId:number){
    return  this.http.get(`${ApiUrl.products}?ProductId=${productId}`)
  }
}
