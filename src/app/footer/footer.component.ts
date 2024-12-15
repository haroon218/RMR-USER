import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports:[RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showScanner = false;
  qrScanner!: Html5QrcodeScanner;
  loginUser:any=false
  showNavbar: boolean = true; // Controls the visibility of the navbar
  activityTimeout: any;
  constructor(private authservice:AuthService,){
    
  }
  ngOnInit(): void {
    this.authservice.isLoggedIn$.subscribe((status) => {
      this.loginUser = status;
    });
    this.resetActivityTimer();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.resetActivityTimer(); // Reset the activity timer on scroll
    this.showNavbar = true; // Show navbar on activity
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: Event): void {
    this.resetActivityTimer(); // Reset the activity timer on mouse move
    this.showNavbar = true; // Show navbar on activity
  }

  @HostListener('window:click', ['$event'])
  onClick(event: Event): void {
    this.resetActivityTimer(); // Reset the activity timer on click
    this.showNavbar = true; // Show navbar on activity
  }

  // Reset the inactivity timer and hide navbar after a set period
  resetActivityTimer(): void {
    clearTimeout(this.activityTimeout);
    this.activityTimeout = setTimeout(() => {
      this.showNavbar = false; // Hide the navbar after inactivity
    }, 2000); // 5 seconds of inactivity
  }
  openScanner() {
    this.showScanner = true;

    // Initialize the QR scanner
    if (!this.qrScanner) {
      this.qrScanner = new Html5QrcodeScanner(
        "qr-scanner",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        false
      );

      // Render scanner and handle results
      this.qrScanner.render(
        (decodedText: string) => {
          this.handleDecodedText(decodedText);
          this.closeScanner();
        },
        (error: string) => {
          console.error(`QR Code Scan Error: ${error}`);
        }
      );
    }
  }

  handleDecodedText(decodedText: string) {
    try {
      const url = new URL(decodedText); // Validates if it's a valid URL
      window.location.href = url.toString();
    } catch (e) {
      alert('Invalid QR Code: Not a valid URL');
    }
  }
  

  closeScanner() {
    this.showScanner = false;
    if (this.qrScanner) {
      this.qrScanner.clear().then(() => console.log("Scanner stopped")).catch(console.error);
    }
  }
}
