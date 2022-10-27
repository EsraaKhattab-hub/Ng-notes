import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  //sign up call api function
  register(user:any){
    return this.http.post(`${environment.apiUrl}/auth/register`,user);
  }
}
