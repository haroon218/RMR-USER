import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-profile',
  imports: [RouterModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData:any
  profileData:any
  offers:any=[];
  rewards:any=[];
  branches:any=[];
  reviews:any;
  wallet:any=[]
  constructor(private location: Location,private service:AuthService) {
    this.userData = this.service.getData('user');
    this.profileInformation()
  }
  goBack() {
    this.location.back();
  }
  activeTab: string = 'offer'; // Default active tab

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }
  profileInformation(){
    debugger
this.service.profileInformation(this.userData.companies[0].company_id).subscribe({
  next: (res) => {
    this.profileData=res.data
    this.offers=this.profileData.offers
    this.rewards=this.profileData.rewards
    this.branches=this.profileData.branches
    this.reviews=this.profileData.ratings

  }
})
  }
  userinfo(){
    this.service.userInfo().subscribe({
      next: (res) => {
        this.wallet=res.data.point_wallets
      }
    })
  }
}
