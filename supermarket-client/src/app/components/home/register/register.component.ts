import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public cities: Array<string>;
  public registrationStage: number;

  public registerPartOneForm: FormGroup;
  public id: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  constructor(private usersService: UsersService, private router: Router) { 
    this.userDetails = new UserDetails();
    this.cities = Object.values(City);
    this.registrationStage = 1;
  }

  ngOnInit(): void {
    // Initializing form controls with validators
    this.id = new FormControl("", [Validators.required, Validators.pattern("^[0-9]{9}$")]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", [Validators.required, Validators.pattern("^[0-9a-zA-Z]{8,20}$")]);
    this.confirmPassword = new FormControl("", [Validators.required]);

    // Initializing the from group
    this.registerPartOneForm = new FormGroup({
      id: this.id,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validators: this.passwordMatchValidator.bind(this)});
  }

  public passwordMatchValidator(form: FormGroup) {
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['confirmPassword'].value;

    if(!password || !confirmPassword) {
      return null;
    }

    return (password === confirmPassword) ? null : {mismatch: true};
  }

  public next() {
    this.userDetails.id = this.id.value;
    this.userDetails.email = this.email.value;
    this.userDetails.password = this.password.value;
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
