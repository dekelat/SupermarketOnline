import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageModule } from './welcome-page.module';
import { CustomerComponent } from '../components/customer/customer.component';
import { ProductsComponent } from '../components/products/products.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    CustomerComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WelcomePageModule,
    RouterModule, RoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
