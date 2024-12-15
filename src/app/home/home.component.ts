import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string | null = '';
  homeView:any
  wallet:any
  categories:any
  surveys:any
constructor(private authService:AuthService){

}
  ngOnInit(): void {
    const user = localStorage.getItem('user'); // Retrieve the user object as a string
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      this.userName = parsedUser.name; // Extract and store the name
    }
    this.homeScreen()
    this.getCategories()
    this.userinfo()
  }
  getCategories() {
    this.authService.getCtegories().subscribe({
      next: (res) => {
        debugger;
        // Replace category images with a dummy URL
        this.categories = res.data.data.map((category: any) => ({
          ...category,
          image: 'https://via.placeholder.com/60', // Dummy image URL
        }));
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }
  homeScreen() {
    this.authService.homeScreen().subscribe({
      next: (res) => {
        debugger;
        this.homeView = res.data;
  
        // Filter surveys to exclude those with "servey_submitted" === "yes"
        this.surveys = res.data.surveys.filter(
          (survey: any) => survey.servey_submitted?.toLowerCase() !== "yes"
        );
  
        // Replace homeView's survey data with filtered surveys
        this.homeView.surveys = this.surveys;
  
        console.log(this.homeView);
      },
      error: (err) => {
        console.error("Error fetching home screen data:", err);
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
