import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './services/auth.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'Admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data: {
      role: '23'
    }
  },
  {
    path: 'User',
    component: UserDashboardComponent,
    canActivate: [authGuard],
    data: {
      role: '35'
    }
  }
  // {
  //   path: '**'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
