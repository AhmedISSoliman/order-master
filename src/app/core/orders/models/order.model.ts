export interface OrderViewModel{
    OrderId: number;
    OrderDate: string;
    UserId:string;
    Products:OrderProductModel [];
    PaymentType: string;
}

export interface OrderProductModel{
    ProductId:number;
    Quantity:number;
}