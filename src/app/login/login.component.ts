import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: '',
    name: '',
    surname: '',
  }

  registerInfo = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService,
  ) { }

  login(){
    this.authService.login(this.credentials)
    .then(() => this.router.navigate(['/listview']))
    .catch(() => alert("Błędny login lub hasło"))
  }

  register(){
    this.authService.register(this.credentials)
    .then(() => alert('Konto utworzone, mozesz się zalogować.'))
    .catch(error => alert(error.message))
  }



}
