import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public authentificated:boolean;
  public token: string;

  constructor() { }

  login(username: string, password: string) {
      this.authentificated = (username=="admin" && password == "admin") ? true : false;
      this.saveToken();
      return this.authentificated;
  }

  saveToken(){
    this.token = "texteHaché";
    localStorage.setItem('myToken',this.token);
  }

  loadToken(){
    this.token = localStorage.getItem('myToken');
    this.authentificated = (this.token=="texteHaché") ? true : false;
    return this.authentificated;
  }

  logout() {
    localStorage.removeItem('myToken');
    this.authentificated=false;
  }
}
