import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSidebarOpen: boolean = false;
constructor(private authService:AuthService,private router:Router){}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.Logout().subscribe(
      response => {
        console.log('Logout successful', response);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
        // Handle successful logout (e.g., navigate to login page or show a success message)
        alert('You have logged out!');
      },
      error => {
        console.error('Logout failed', error);
        // Handle error (e.g., show an error message)
        alert('Logout failed. Please try again.');
      }
    );
  }
}
