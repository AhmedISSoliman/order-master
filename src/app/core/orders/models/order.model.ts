export interface OrderViewModel{
    OrderId: number;
    OrderDate: string;
    UserId:string;
    Products:OrderProductModel[];
    PaymentType: string;
    totalPrice: number;
}

export interface OrderProductModel{
    ProductId:number;
    Quantity:number;
    ProductName: string;
    ProductPrice: number;
    TotalPrice?: number; 
}