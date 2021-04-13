import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    let cartId = sessionStorage.getItem("cartId");
    let observable = this.cartService.getCartItems(cartId);

    observable.subscribe(cartItems => {
      this.cartService.cart.products = cartItems;
    }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
          serverErrorResponse.error.error);
    });
  }

  public onDeleteItemFromCart(productId: number) {
    
  }

}
