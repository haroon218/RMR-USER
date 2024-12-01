import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports:[RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showScanner = false;
  qrScanner!: Html5QrcodeScanner;

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
