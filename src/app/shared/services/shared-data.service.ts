import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ApiUrl } from '../../../enviroments/api-url';
import { ProductsListViewModel } from './../../core/products/models/products-list.model';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private products$: BehaviorSubject<ProductsListViewModel[]> = new BehaviorSubject<ProductsListViewModel[]>([]);
  private isProductsLoaded = false;

  constructor(private http: HttpClient) {}

 /** Fetch and cache product data */
  getProducts() {
    return this.http.get<ProductsListViewModel[]>(ApiUrl.products).pipe(map((products) => products.map((product: ProductsListViewModel) => ({
      ...product,
      fewQuantities: product.AvailablePieces < 10
    }))));
}

  getUserById(userId:string){
    return this.http.get<UserModel[]>(`${ApiUrl.users}?Id=${userId}`)
  }
}
