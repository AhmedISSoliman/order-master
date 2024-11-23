import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsListMViewModel } from '../models/products-list.model';
import { map } from 'rxjs';
import { ApiUrl } from '../../../../enviroments/api-url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<ProductsListMViewModel[]>(ApiUrl.products).pipe(map((products)=>products.map((product:any)=>({
      ...product,
      fewQuantities: product.AvailablePieces<10
    }))))

    // return this.http.get<ProductsListMViewModel[]>(ApiUrl.products).pipe(
    //   map((products) => 
    //     products.map((product) => ({
    //       ...product,
    //       fewQuantities: product.AvailablePieces
    //     }))
    //   )
    // );
  }

  editProductQuantity(id:string, quantity: number) {
    return this.http.patch<ProductsListMViewModel>(
      `${ApiUrl.productQuantity}${id}` ,{AvailablePieces:quantity}
    );
  }
}
