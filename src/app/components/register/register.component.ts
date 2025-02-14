import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
    imports: [CommonModule,FormsModule,RouterLink],
  
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  registerUser() {
    if (this.email && this.password) {
      this.authService.register(this.email, this.password);
    } else {
      console.error('Email and password are required');
    }
  }
}
