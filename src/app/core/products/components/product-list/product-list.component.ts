import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductsListViewModel } from '../../models/products-list.model';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SharedDataService } from '../../../../shared/services/shared-data.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
products:ProductsListViewModel[];
editedQuantity: number;

constructor(private service: ProductService, public dialog: MatDialog,private sharedService:SharedDataService) {}
ngOnInit(){
  this.getProducts();
}

getProducts(){
  this.sharedService.getProducts().subscribe(res=>{
    this.products=res;
  })
}

openEditQuantityModal(product: ProductsListViewModel,content:any): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width='400px'
  dialogConfig.data = { quantity: product.AvailablePieces };

  const dialogRef = this.dialog.open(content, dialogConfig);

  dialogRef.afterClosed().subscribe((result) => {
    if (result !== undefined) {
      this.service.editProductQuantity(product.id, result).subscribe(() => {
        this.getProducts();
      });
    }
  });
}
}
