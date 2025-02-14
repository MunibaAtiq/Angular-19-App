import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true, 
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email :string = '';
  message :string = '';

  constructor(private authService:AuthService){}

  resetPassword(){
    if(this.email){
      this.authService.resetPassword(this.email).then(()=>{
        this.message = 'Password reset Link sent! Check your Email';
      }).catch(error=>{
        this.message = error.message;
      })
    }
  }
}
