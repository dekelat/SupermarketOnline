import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from '../models/Count';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public getNumberOfAllOrders(): Observable<Count> {
    return this.http.get<Count>("http://localhost:3001/orders/count");
  }
}
