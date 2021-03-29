import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usersService: UsersService, private router: Router) { 
    this.userDetails = new UserDetails();
    this.confirmPassword = "";
  }

  ngOnInit(): void {
  }

  public register() {
    let observable = this.usersService.register(this.userDetails);

    observable.subscribe(userDetails => {
      console.log(userDetails);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

}
