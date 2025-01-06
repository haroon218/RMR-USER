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
    this.userinfo()
    // this.fetchGoogleReviews()
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
  fetchGoogleReviews() {
    const placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // Replace with your Place ID
    const map = new google.maps.Map(document.createElement('div'), {
      center: { lat: -33.867, lng: 151.195 },
      zoom: 15
    });

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId, fields: ['reviews'] },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          debugger
          this.reviews = place?.reviews || [];
        } else {
          console.error('Failed to fetch reviews:', status);
        }
      }
    );
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  }
  userinfo(){
    this.service.userInfo().subscribe({
      next: (res) => {
        this.wallet=res.data.point_wallets
      }
    })
  }
}
