import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from '../components/about/about.component';
import { ShopTransitionComponent } from '../components/shop-transition/shop-transition.component';

const routes: Routes = [
  {
    path: "home", component: WelcomePageComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "shop", component: ShopTransitionComponent },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ]
  }
];

@NgModule({
  declarations: [
    WelcomePageComponent,
    LoginComponent,
    RegisterComponent,
    ShopTransitionComponent,
    AboutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes) // Importing the above routes
  ]
})
export class WelcomePageModule { }
