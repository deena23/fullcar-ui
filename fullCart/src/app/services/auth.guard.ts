import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    console.log(route.data);
    if(route.data['role'] && route.data['role']== '35' && userRole == '35') {     
      return router.parseUrl('/User');
    }
    return true;
  }
  return router.parseUrl('/login');
};
