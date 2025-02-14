import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports:[CommonModule]
})
export class DashboardComponent {
  userEmail: string | null = null; // Store user email

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.userEmail = user ? user.email : null;
    });
  }

  logout() {
    this.authService.logout();
  }
}
