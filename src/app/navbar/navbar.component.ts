import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  credentials = {
    email: '',
    password: '',
    name: '',
    surname: '',
  }



  constructor(
    private router: Router,
    private authService: AuthServiceService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout()
    .then(() => this.router.navigate(['/login']))
    .then(() => alert("Wylogowano"))
  }

}
