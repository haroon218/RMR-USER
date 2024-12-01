import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reward-detail',
  imports: [],
  templateUrl: './reward-detail.component.html',
  styleUrl: './reward-detail.component.css'
})
export class RewardDetailComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
