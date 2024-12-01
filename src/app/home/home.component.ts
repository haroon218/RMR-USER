import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userName: string | null = '';

  ngOnInit(): void {
    const user = localStorage.getItem('user'); // Retrieve the user object as a string
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      this.userName = parsedUser.name; // Extract and store the name
    }
  }
}
