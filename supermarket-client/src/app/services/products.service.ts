import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Count } from '../models/Count';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product[];

  constructor(private http: HttpClient) { 
    this.products = [];
  }

  public getNumberOfAvailableProducts(): Observable<Count> {
    return this.http.get<Count>("http://localhost:3001/products/count");
  }

  public getProducts(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/" + categoryId);
  }

  public searchProducts(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/search/" + productName);
  }
}
