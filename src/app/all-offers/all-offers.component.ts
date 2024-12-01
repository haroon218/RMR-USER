import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-all-offers',
  imports: [RouterModule],
  templateUrl: './all-offers.component.html',
  styleUrl: './all-offers.component.css'
})
export class AllOffersComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
