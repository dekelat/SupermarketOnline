import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from '../models/Count';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  constructor(private http: HttpClient) { }

  public getNumberOfAllOrders(): Observable<Count> {
    return this.http.get<Count>("http://localhost:3001/orders/count");
  }

  public getLastOrder(): Observable<Order> {
    return this.http.get<Order>("http://localhost:3001/orders/");
  }

  public getUnavailableDeliveryDates(): Observable<Date[]> {
    return this.http.get<Date[]>("http://localhost:3001/orders/dates");
  }
}
