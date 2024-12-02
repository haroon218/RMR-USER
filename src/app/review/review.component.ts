import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  ratingForm!: FormGroup;
  rating: number = 0;
  stars = Array(5).fill(0);
  id:any
  companyName:any
  constructor(private fb: FormBuilder,private service:AuthService,private route:ActivatedRoute,private router: Router) {
    this.ratingForm = this.fb.group({
      id: [''], // Example ID, replace with dynamic ID
      rating: [0, [Validators.required, Validators.min(1)]], // Ensure at least 1 star is selected
      body: ['', [Validators.required, Validators.minLength(10)]],
      title:[''] // Ensure minimum text length
    });
  }
  ngOnInit() {
    // Extract ID from the query parameters
    const userData:any= this.service.getData('user');
    this.id=userData.companies[0].company_id;
    this.companyName=userData.companies[0].company_name
  }
  setRating(rating: number): void { 
    this.ratingForm.patchValue({ rating });
  }
  get ratingText(): string {
  switch (this.ratingForm.get('rating')?.value) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }
  submitRating(){
    this.ratingForm.patchValue({
      id: this.id,
      title: this.ratingText, // Example ID, replace with dynamic ID
    })
    if (this.ratingForm.invalid) {
      this.ratingForm.markAllAsTouched(); // Highlight invalid fields
      return;
    }
  
this.service.addreview(this.ratingForm.value).subscribe({
  next: (res) => {
    if(res.success){
      this.router.navigate(['/home']);
    }
  }
})
  }
}
