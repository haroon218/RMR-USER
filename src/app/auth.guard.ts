import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, redirect to home
      this.router.navigate(['/home']);
      return false; // Block access to login/register
    }
    return true; // Allow access if no token
  }
}
