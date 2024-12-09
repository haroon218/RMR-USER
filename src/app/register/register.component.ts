import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;
  isRegisterMode: boolean = true; // Toggle between register and login modes
  decryptedId:any
  constructor(
    private fb: FormBuilder,    private route: ActivatedRoute,
private service:AuthService,
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
  ngOnInit() {
    // Extract ID from the query parameters
    this.route.queryParamMap.subscribe(params => {
      debugger
      const id = params.get('id');
      if (id) {
       this.decryptedId= this.service.decryptId(id);
      }
    });
  }
  // Switch between login and register modes
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  // Handle signup
  onRegisterSubmit() {
    // this.checkexist()
    this.signupForm.patchValue({
      company_id:this.decryptedId
    })
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      formValue.mobile = `${formValue.mobile}`;
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
            if(response.success){
              this.router.navigate(['/login'])
              this.toastr.success(response.message,'Success')
            }
          },
          error: (err: any) => {
            debugger
            this.toastr.error(err.error.message,'Error')

          },
        });
    }
  }
  
  // checkexist(){
  //   const data={
  //     mobile:this.signupForm.value.mobile
  //   }
  //   this.service.checkExist(data).subscribe({
  //     next: (response: any) => {
  //       if(response.success){
  //         this.toastr.error(response.message,'Error')
  //       }
  //     }
  //   })
  // }
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
