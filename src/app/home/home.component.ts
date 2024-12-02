import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string | null = '';
  homeView:any
  wallet:any
constructor(private authService:AuthService){

}
  ngOnInit(): void {
    const user = localStorage.getItem('user'); // Retrieve the user object as a string
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      this.userName = parsedUser.name; // Extract and store the name
    }
    this.homeScreen()
    this.userinfo()
  }
  homeScreen(){
this.authService.homeScreen().subscribe({
  next: (res) => {
    this.homeView=res.data;
  }
})
  }
  userinfo(){
    this.authService.userInfo().subscribe({
      next: (res) => {
        this.wallet=res.data.point_wallets
      }
    })
  }
}
