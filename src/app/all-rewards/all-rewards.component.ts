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
  isLoading=true
  constructor(private location: Location,private authService:AuthService) {
    this.homeScreen();
    this.userinfo()
  }
  goBack() {
    this.location.back();
  }
  homeScreen(){
    debugger
    this.authService.homeScreen().subscribe({
      next: (res) => {
        this.rewards=res.data.rewards;
        this.isLoading=false
      }
    })
      }
      userinfo(){
        this.authService.userInfo().subscribe({
          next: (res) => {
            this.wallet=res.data.point_wallets
          }
        })
      }
}
