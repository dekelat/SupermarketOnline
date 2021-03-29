import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/UserDetails';
import { UserLoginDetails } from '../models/UserLoginDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public login(userLoginDetails: UserLoginDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>
      ("http://localhost:3001/users/login", userLoginDetails);
  }

  public register(userDeatils: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>
      ("http://localhost:3001/users/", userDeatils);
  }
}

