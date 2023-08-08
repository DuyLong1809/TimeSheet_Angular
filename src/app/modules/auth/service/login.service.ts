import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface, LoginRespon } from '../interface/login-interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public authLogin(credentials: LoginInterface) {
    const apiUrl = `${environment.baseUrl}/TokenAuth/Authenticate`;
    return this.http.post<LoginRespon>(apiUrl, credentials);
  }
}
