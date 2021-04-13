import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Cart;

  constructor(private http: HttpClient) { 
    this.cart = new Cart();
  }

  public getOpenCart(): Observable<Cart> {
    return this.http.get<Cart>("http://localhost:3001/carts/");
  }

  public createNewCart(): Observable<any> {
    return this.http.post<any>("http://localhost:3001/carts/", null);
  }

  public getCartItems(cartId): Observable<any>{
    return this.http.get<any>("http://localhost:3001/carts/" + cartId);
  }
}
