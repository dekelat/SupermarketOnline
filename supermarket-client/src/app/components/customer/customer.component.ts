import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public selectedProduct: Product;
  public displayModal: string;

  constructor(private cartService: CartService) {
    this.selectedProduct = new Product();
    this.displayModal = "none";
  }

  ngOnInit(): void {
  }

  onProductClick(product: Product) {
    console.log(product);
    this.selectedProduct = product;
    this.selectedProduct.quantity = 1;
    this.displayModal = "block";
  }

  public addToCart() {
    this.selectedProduct.price = +(this.selectedProduct.unitPrice * this.selectedProduct.quantity).toFixed(2);
    let observable = this.cartService.addItemToCart(this.selectedProduct);

    observable.subscribe(response => {
      this.cartService.cart.products.push(this.selectedProduct);
      this.cartService.total += this.selectedProduct.price;
      this.displayModal = "none";

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onCloseModal() {
    this.displayModal = "none";
  }

}
