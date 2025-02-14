import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';  

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet,RouterLink], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-firebase-crud';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']); 
    });
  }
}
