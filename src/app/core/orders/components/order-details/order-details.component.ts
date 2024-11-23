import { Component, OnInit } from '@angular/core';
import { OrderViewModel } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{
orderId:number;
orderDetails:OrderViewModel;
displayedColumns: string[] = ['ProductId', 'Quantity'];

constructor(private service:OrderService,private activatedRoute:ActivatedRoute){
  this.orderId = activatedRoute.snapshot.params.orderId;
  console.log(this.orderId);
}

ngOnInit() {
  this.getOrderDetails();
}

getOrderDetails() {
  this.service.getOrderDetails(this.orderId).subscribe((res) => {
    this.orderDetails = res[0];    
  });
}
}
