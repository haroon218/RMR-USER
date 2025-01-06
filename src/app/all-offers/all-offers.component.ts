import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-all-offers',
  imports: [RouterModule,CommonModule],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.css'
})
export class AllOffersComponent {
  offers:any=[]
  isLoading = true;
  wallet:any=[]
  categories:any = [
   
  ];  constructor(private location: Location,private authService:AuthService) {
    this.userinfo()
    this.loadHomeScreen()
    this.getCategories()
  }
  goBack() {
    this.location.back();
  }
  shareContent() {
    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        text: 'Here is something interesting for you to explore.',
        url: window.location.href,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  }
  getCategories() {
    this.authService.getCtegories().subscribe({
      next: (res) => {
        debugger;
        // Replace category images with a dummy URL
        this.categories = res.data.data
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }
  loadHomeScreen(categoryId?: string){
    debugger
    const company:any=localStorage.getItem('user');
    const user = JSON.parse(company);
   const company_id=user.companies[0].company_id;
    this.isLoading=true
    this.authService.homeScreen(categoryId,company_id).subscribe({
      next: (res) => {
        this.offers=res.data.offers;
        this.isLoading=false
        // this.userinfo()

      }
    })
      }
      onCategoryClick(categoryId: string): void {
        this.loadHomeScreen(categoryId);
      }
      userinfo(){
        this.authService.userInfo().subscribe({
          next: (res) => {
            this.wallet=res.data.point_wallets
          }
        })
      }
}
