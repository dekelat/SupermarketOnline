import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-shop-transition',
  templateUrl: './shop-transition.component.html',
  styleUrls: ['./shop-transition.component.css']
})
export class ShopTransitionComponent implements OnInit {

  public buttonValue: string;
  public message: string;

  constructor(private cartService: CartService, private ordersService: OrdersService, 
    private router: Router) {
    this.buttonValue = "";
    this.message = "";
  }

  ngOnInit(): void {
    this.getOpenCart()
  }

  public getOpenCart() {
    let observable = this.cartService.getOpenCart();

    observable.subscribe(cart => {
      if (cart) {
        this.cartService.cart = cart;
        sessionStorage.setItem("cartId", this.cartService.cart.id.toString());
        this.message = "You have an open cart from " + cart.dateCreated;
        this.buttonValue = "Continue Shopping";
      }
      else {
        this.getLastOrder();
      }
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public getLastOrder() {
    let observable = this.ordersService.getLastOrder();

    observable.subscribe(order => {
      if(order){
        this.message = "Your last order was on " + order.orderDate + 
          " with total price of " + order.totalPrice;
      }
      else {
        this.message = "Welcome to your first order";
      }

      this.buttonValue = "Start Shopping";
      
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
        serverErrorResponse.error.error);
    });
  }

  public startShopping() {

    if(!this.cartService.cart.id) {
      let observable = this.cartService.createNewCart();

      observable.subscribe(cartId => {
        this.cartService.cart = new Cart(cartId, new Date(), []);
        sessionStorage.setItem("cartId", this.cartService.cart.id.toString());

      }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + 
          serverErrorResponse.error.error);
      });
    }

    this.router.navigate(["/customer"]);
  }

}
