import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;
  isRegisterMode: boolean = true; // Toggle between register and login modes

  constructor(
    private fb: FormBuilder,private authservice:AuthService,
    private http: HttpClient,
    private router: Router,private toastr:ToastrService
  ) {
    // Initialize signup form
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required]],
      date_of_birth: [''],
      gender: [''],
      company_id: [''], // Default value for company ID
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      marketing_chk: [false],
    });

    // Initialize login form
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Switch between login and register modes
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  // Handle signup
  onRegisterSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      formValue.mobile = `+966${formValue.mobile}`;
      // Ensure passwords match
      if (formValue.password !== formValue.confirm_password) {
        alert('Passwords do not match!');
        return;
      }

      // Make API call to register the user
      this.authservice.login(formValue)
        .subscribe({
          next: (response: any) => {
            console.log('User registered:', response);
            alert('Registration successful! Please log in.');
            this.toggleMode(); // Switch to login mode
          },
          error: (err: any) => {
            console.error('Registration error:', err);
            alert('Registration failed. Please try again.');
          },
        });
    }
  }

  // Handle login
  onLoginSubmit() {
    if (this.loginForm.valid) {
       this.authservice.login(this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            if(response.success){
              this.toastr.success(response.message,'Success')
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              this.authservice.setLoginStatus(true);
              this.router.navigate(['/review']);
            }
            else{
              this.toastr.error(response.message,'Error')
            }
           
          },
          error: (err: any) => {
            this.toastr.error(err.error.message,'Error')
          },
        });
    }
  }
}
