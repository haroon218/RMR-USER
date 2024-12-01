import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-detail',
  imports: [],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.css'
})
export class OfferDetailComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
