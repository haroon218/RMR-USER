import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [RouterModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
  activeTab: string = 'offer'; // Default active tab

  selectTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
