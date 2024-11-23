import { Component, ViewChild, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderViewModel } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'], // Fixed 'styleUrl' typo to 'styleUrls'
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['OrderId', 'OrderDate', 'ProductsCount', 'totalPrice', 'paymentMethod', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<OrderViewModel[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hidden = false;

  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.service.getOrdersWithProductDetails().subscribe((orders) => {
      const enrichedOrders = orders.map((order) => ({
        ...order,
        OrderDate: new Date(order.OrderDate), // Parse OrderDate
        ProductsCount: order.Products.length,
      }));
      this.dataSource.data = enrichedOrders;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  calculateTotalPrice(products: any[]): number {
    return products?.reduce((sum, current) => sum + current.Quantity * current.Price, 0) || 0;
  }
}
