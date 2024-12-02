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
  constructor(private location: Location,private authService:AuthService) {
    this.homeScreen()
  }
  goBack() {
    this.location.back();
  }
  homeScreen(){
    debugger
    this.authService.homeScreen().subscribe({
      next: (res) => {
        this.offers=res.data.offers;
        this.isLoading=false
        // this.userinfo()

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
