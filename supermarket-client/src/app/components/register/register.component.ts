import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { UserDetails } from 'src/app/models/UserDetails';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userDetails: UserDetails;
  public confirmPassword: string;
  public cities: Array<string>;
  public registrationStage: number;

  constructor(private usersService: UsersService, private router: Router) { 
    this.userDetails = new UserDetails();
    this.confirmPassword = "";
    this.cities = Object.values(City);
    this.registrationStage = 1;
  }

  ngOnInit(): void {
  }

  public next() {
    this.registrationStage++;
  }

  public back() {
    this.registrationStage--;
  }

  public register() {
    this.userDetails.userType = "CUSTOMER";
    let observable = this.usersService.register(this.userDetails);

    observable.subscribe(userDetails => {
      console.log(userDetails);
      sessionStorage.setItem("token", userDetails.token);
      sessionStorage.setItem("userType", userDetails.userType);

      if(userDetails.userType == "CUSTOMER") {
        // this.router.navigate(["/customer"]);
        this.router.navigate(["/home/shop"]);
      }

      if(userDetails.userType == "ADMIN") {
        this.router.navigate(["/admin"]);
      }

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

}
