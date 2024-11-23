import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsListViewModel } from '../models/products-list.model';
import { map } from 'rxjs';
import { ApiUrl } from '../../../../enviroments/api-url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  editProductQuantity(id: string, quantity: number) {
    return this.http.patch<ProductsListViewModel>(
      `${ApiUrl.productQuantity}${id}`, { AvailablePieces: quantity }
    );
  }
}
