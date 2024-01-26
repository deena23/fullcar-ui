import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: any = localStorage.getItem('User');
  menu: any [] = [
    {
      title: 'Admin',
      route: '/Admin'
    },
    {
      title: 'User',
      route: '/User'
    }
  ];
  constructor(
    private _authService: AuthService
  ){}
  ngOnInit() {}
  logout(){
    this._authService.logOut();
  }
}
