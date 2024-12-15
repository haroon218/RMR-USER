import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const allowedRoutes = ['/login', '/signup']; // Routes that should be accessible without token

    // If there is a token
    if (token) {
      // If the user tries to access login or signup, redirect them to home (or any other page)
      if (allowedRoutes.includes(state.url)) {
        this.router.navigate(['/home']); // Redirect to home or dashboard
        return false; // Block access to login/signup
      }
      return true; // Allow access to other routes if the user has a token
    }

    // If there's no token, allow access to login/signup only
    if (allowedRoutes.includes(state.url)) {
      return true; // Allow access to login/signup
    } else {
      this.router.navigate(['/signup']); // Redirect to signup if no token
      return false; // Block access to other routes
    }
  }
}
