import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean;
  public searchTerm: string;

  constructor(private router: Router,
    public cartService: CartService, 
    public usersService: UsersService,
    public productsService: ProductsService) {
      this.isCollapsed = true;
      this.searchTerm = "";
  }

  ngOnInit(): void {
    this.usersService.loggedInUser = new SuccessfulLoginServerResponse(
      sessionStorage.getItem("token"), sessionStorage.getItem("userType"), 
        sessionStorage.getItem("userName")
    );
  }

  public onCartToggle() {
    this.cartService.isCartOpen = !this.cartService.isCartOpen;
  }

  public onLogout() {
    this.usersService.loggedInUser = new SuccessfulLoginServerResponse();
    sessionStorage.clear();
    this.router.navigate(["/home"]);
  }

  public onSearchProducts() {
    let observable = this.productsService.searchProducts(this.searchTerm);
    this.searchTerm = "";

    observable.subscribe(products => {
      this.productsService.products = products;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }
}
