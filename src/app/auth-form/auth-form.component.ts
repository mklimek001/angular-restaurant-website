import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  email = ""
  password = ""
  logged = false

  constructor( public auth: AuthServiceService) { }

  ngOnInit(): void {
    this.logged = this.auth.isUsrLogged
  }

  onLogin(): void{
    console.log("login")
    console.log(this.email);
    this.logged = this.auth.login(this.email, this.password);
  }

  onRegister(): void{
    console.log("register")
    console.log(this.email);
    this.logged = this.auth.newUser(this.email, this.password);
  }

  onLogout(): void{
    console.log("logged out")
    this.email = ""
    this.password = ""
    this.logged = this.auth.logout();
  }

  actualize():void{
    this.logged = this.auth.isUsrLogged;
  }
}
