import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isSidebarOpen: boolean = false;
  isLoggedIn: boolean = false; 
constructor(private authService:AuthService,private router:Router, private toastr: ToastrService){
  this.authService.isLoggedIn$.subscribe((status) => {
    this.isLoggedIn = status;
    this.isSidebarOpen=false
  });
}
  toggleSidebar() {
 if (this.isLoggedIn) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }  
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
        this.toastr.success('Logout Successfully!', 'Success');
      },
      error => {
        console.error('Logout failed', error);
        // Handle error (e.g., show an error message)
        alert('Logout failed. Please try again.');
      }
    );
  }
}
