import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-all-rewards',
  imports: [RouterModule,CommonModule],
  templateUrl: './all-rewards.component.html',
  styleUrl: './all-rewards.component.css'
})
export class AllRewardsComponent {
  rewards:any
  wallet:any
  surveys:any
  isLoading=true
  categories :any= [
  
  ];   constructor(private location: Location,private authService:AuthService) {
    this.loadHomeScreen();
    this.userinfo()
    this.getCategories()
  }
  goBack() {
    this.location.back();
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
    this.isLoading=true

    this.authService.homeScreen(categoryId).subscribe({
      next: (res) => {
        debugger
        this.rewards=res.data.rewards;
        this.surveys=res.data.surveys;
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
