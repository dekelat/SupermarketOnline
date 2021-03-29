import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
  
  constructor(private usersService: UsersService, private router: Router) { 
    this.userLoginDetails = new UserLoginDetails();
  }

  ngOnInit(): void {
  }

  public login(): void {
    let observable = this.usersService.login(this.userLoginDetails);

    observable.subscribe(userDetails => {
      
      sessionStorage.setItem("token", userDetails.token);
      sessionStorage.setItem("userType", userDetails.userType);

      if(userDetails.userType == "CUSTOMER") {
        this.router.navigate(["/customer"]);
      }

      if(userDetails.userType == "ADMIN") {
        this.router.navigate(["/admin"]);
      }

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

}
