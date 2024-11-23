import { environment } from "./environment";

/** class used to hold all API Urls */
export class ApiUrl {
// products
  public static products = environment.apiBaseUrl + 'products';
  public static productQuantity = environment.apiBaseUrl + 'products/';

  // Orders
  public static orders = environment.apiBaseUrl + 'orders';
  public static orderDetails = environment.apiBaseUrl + 'orders?OrderId=';
  
  //Users
  public static users = environment.apiBaseUrl + 'users';
}
