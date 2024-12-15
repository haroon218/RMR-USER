import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-all-surveys',
  imports: [RouterModule,CommonModule],
  templateUrl: './all-surveys.component.html',
  styleUrl: './all-surveys.component.css'
})
export class AllSurveysComponent {
  surveys:any
  offers:any=[]
  isLoading = true;
  wallet:any=[]
  categories:any = [
   
  ];  constructor(private location: Location,private authService:AuthService) {
    this.userinfo()
    this.surveyListing()
  }
  goBack() {
    this.location.back();
  }
 
  surveyListing() {
    debugger;
    this.isLoading = true;
  
    // Retrieve user information from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    // Extract company_id from the user object
    const companyId = user?.companies?.[0]?.company_id; // Assuming companies is an array and you want the first company's id
  
    // Check if companyId exists
    if (!companyId) {
      console.error('No company ID found in user data.');
      this.isLoading = false;
      return;
    }
  
    this.authService.homeScreen().subscribe({
      next: (res) => {
        if (res.data?.surveys) {
          // Filter surveys based on the company ID
          this.surveys = res.data.surveys.filter(
            (survey: any) => survey.company_id === companyId
          );
        } else {
          this.surveys = [];
        }
  
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching surveys:', err);
        this.isLoading = false;
      },
    });
  }
  
     
      userinfo(){
        this.authService.userInfo().subscribe({
          next: (res) => {
            this.wallet=res.data.point_wallets
          }
        })
      }
}

