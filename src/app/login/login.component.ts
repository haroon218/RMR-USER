import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize signup form
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required]],
      date_of_birth: [''],
      gender: [''],
      company_id: ['2'], // Default value for company ID
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
      this.http
        .post('https://rmr-api.sohoby.com/public/api/user/register', formValue)
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
      // Make API call to log in the user
      this.http
        .post('https://rmr-api.sohoby.com/public/api/user/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Login successful:', response);
            localStorage.setItem('token', JSON.stringify(response.data.token));

            // Store user details in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redirect to the home route
            this.router.navigate(['/home']);
          },
          error: (err: any) => {
            console.error('Login error:', err);
            alert('Login failed. Please check your credentials.');
          },
        });
    }
  }
}
