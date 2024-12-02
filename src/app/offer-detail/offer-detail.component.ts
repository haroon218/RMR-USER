import { Component } from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-offer-detail',
  imports: [NgIf],
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.css'
})
export class OfferDetailComponent {
  offer: any = null; // To store the matched offer
  isLoading: boolean = true; // Loading state
  wallet:any
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    // Extract ID from the query parameters
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadOfferById(id);
      }
    });
    this.userinfo()
  }

  loadOfferById(id: string) {
    this.authService.homeScreen().subscribe({
      next: (res) => {
        // Match the offer based on the ID
        const offers = res.data.offers;
        debugger
        this.offer = offers.find((offer: any) => offer.id == id);
        if (this.offer) {
          console.log('Matched Offer:', this.offer);
        } else {
          console.log('No offer found with ID:', id);
        }
        this.isLoading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching offers:', err);
        this.isLoading = false; // Stop loading even on error
      }
    });
  }
  userinfo(){
    this.authService.userInfo().subscribe({
      next: (res) => {
        this.wallet=res.data.point_wallets
      }
    })
  }
}

