import { Component, OnInit } from '@angular/core';
import { OrderViewModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../../../shared/services/shared-data.service';
import { UserModel } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
orderId:number;
orderDetails:OrderViewModel;
userDetails:UserModel;
displayedColumns: string[] = ['ProductId','ProductName', 'Quantity','ProductPrice','TotalPrice'];

constructor(
  private service:OrderService,
  private activatedRoute:ActivatedRoute,
  private sharedService:SharedDataService
){
  this.orderId = activatedRoute.snapshot.params.orderId;
}

ngOnInit() {
  this.getOrderDetails();
}

getOrderDetails() {
  this.service.getOrderDetails(this.orderId).subscribe((res) => {
    this.orderDetails = res[0];  
    this.getUserDetails();  
    this.getProductDetails();
  });
}

getUserDetails(){
  this.sharedService.getUserById(this.orderDetails.UserId).subscribe(res=>{
    this.userDetails=res[0];
  });
}

getProductDetails() {
  this.sharedService.getProducts().subscribe({
    next: (products) => {
      this.orderDetails.Products = this.orderDetails.Products.map((product) => {
        const productDetails = products.find((p) => p.ProductId === product.ProductId);
        return {
          ...product,
          ProductName: productDetails?.ProductName!!,
          ProductPrice: productDetails?.ProductPrice || 0,
        };
      });
    }
  });
}
}
