import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
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

  private passwordMathValidator(form: FormGroup) {
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['confirmPassword'].value;

    if(!password || !confirmPassword) {
      return null;
    }

    return (password === confirmPassword) ? null : {mismatch: true};
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

    observable.subscribe(response => {
      alert("Account created successfully! you can log in");
      this.router.navigate(["/home/login"]);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      // Add handel error function that will take user to the stage where the error accured
    });
  }

}
