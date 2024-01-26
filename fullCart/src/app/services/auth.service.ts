import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  isLoggedIn() {
    return localStorage.getItem('Token') ? true : false;
  }
  getRole() {
    return localStorage.getItem('Role');
  }
  logOut() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }
}
