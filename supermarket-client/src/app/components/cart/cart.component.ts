import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    if (this.cartService.cart.id === undefined) {
      this.cartService.cart.id = +sessionStorage.getItem("cartId");
    }

    let observable = this.cartService.getCartItems();

    observable.subscribe(cartItems => {
      this.cartService.cart.products = cartItems;
      this.cartService.cart.products.map( product => 
        this.cartService.total += (+product.price));

    }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
          serverErrorResponse.error.error);
    });
  }

  public onDeleteItemFromCart(product: Product) {
    let observable = this.cartService.deleteItemFromCart(product.id);

    observable.subscribe(response => {
      this.cartService.cart.products = 
        this.cartService.cart.products.filter(currentProduct => 
          currentProduct.id !== product.id);
      this.cartService.total = +(this.cartService.total - product.price).toFixed(2);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
        serverErrorResponse.error.error);
    });
  }

  public onDeleteAllItems(){}
  public onCheckout(){}

}
