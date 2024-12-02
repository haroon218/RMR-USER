import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reward-detail',
  imports: [],
  templateUrl: './reward-detail.component.html',
  styleUrl: './reward-detail.component.css'
})
export class RewardDetailComponent {
  wallet:any
  constructor(private location: Location,private service:AuthService) {
    this.userinfo()
  }
  goBack() {
    this.location.back();
  }
  userinfo(){
    this.service.userInfo().subscribe({
      next: (res) => {
        this.wallet=res.data.point_wallets
      }
    })
  }
}
