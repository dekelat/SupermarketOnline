import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/models/City';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cities: string[];
  public creditCard: string;
  public invoiceUrl: SafeUrl;
  public orderDetails: Order;
  public minDate: NgbDate;
  public maxDate: NgbDate;
  public model: NgbDateStruct;
  public unavailableDeliveryDates: Date[];

  constructor(private router: Router, private sanitizer: DomSanitizer,
    private calendar: NgbCalendar, private usersService: UsersService, 
    private cartService: CartService) {
    this.creditCard = "";
    this.invoiceUrl = null;
    this.orderDetails = new Order();
    this.cities = Object.values(City);
    this.unavailableDeliveryDates = [new Date("2021-04-24"), new Date("2021-04-27")];
    this.minDate = this.calendar.getToday();
    this.maxDate = this.calendar.getNext(this.minDate, 'm', 2);
  }

  ngOnInit(): void { }

  public onDblStreet(): void {
    let observable = this.usersService.getStreet();

    observable.subscribe(data => {
      this.orderDetails.street = data;

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onDblCity(): void {
    let observable = this.usersService.getCity();

    observable.subscribe(data => {
      this.orderDetails.city = data;

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onPurchase(): void {
    this.orderDetails.orderDate = new Date();
    this.orderDetails.cartId = this.cartService.cart.id;
    this.orderDetails.totalPrice = this.cartService.total;
    this.orderDetails.paymentMethod = this.creditCard.substr(-4);
    this.createInvoice();
  }

  public createInvoice(): void {
    let content = "🛒 Thank you for shopping at our Supermarket 🛒\n\n" +
      "Order No. #" + this.orderDetails.id + "\n" +
      this.orderDetails.orderDate.toISOString().split('T')[0] + "\n\n" +
      "Items Ordered\n" +
      "-------------------------------------------------------------------\n";

    this.cartService.cart.products.forEach(item => {
      content += " " + item.name.padEnd(30) + "\tx " + item.quantity +
        "\t₪" + item.price + "\n";
    });

    content += "-------------------------------------------------------------------\n" +
      "Total: ₪" + this.cartService.total + "\n\n\nShipping Address🚚\n" +
      "-------------------------------------------------------------------\n " +
      this.orderDetails.street + ", " + this.orderDetails.city + "\n " +
      "Delivery on: " + this.orderDetails.deliveryDate + "\n\n" +
      "Payment Info \n" +
      "-------------------------------------------------------------------\n " +
      "💳 **** **** **** " + this.orderDetails.paymentMethod;

    let blob = new Blob([content], { type: 'text/plain' });
    this.invoiceUrl =
      this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  public onCloseModal(): void {
    this.cartService.isInCheckoutMode = false;
    this.router.navigate(["/home/shop"]);
  }
}
