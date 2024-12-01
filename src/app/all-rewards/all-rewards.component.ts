import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-rewards',
  imports: [RouterModule],
  templateUrl: './all-rewards.component.html',
  styleUrl: './all-rewards.component.css'
})
export class AllRewardsComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
