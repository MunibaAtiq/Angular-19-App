import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  // Register user
  register(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        this.router.navigate(['/dashboard']); // Redirect after successful registration
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
      });
  }

  // Login user
  login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        this.router.navigate(['/dashboard']); // Redirect after successful login
      })
      .catch((error) => {
        console.error('Login error:', error.message);
      });
  }

  // Get current user
  getCurrentUser(): Observable<User | null> {
    return user(this.auth);
  }

  // Logout user
  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        console.log('User logged out');
        this.router.navigate(['/login']); // Redirect to login after logout
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  }

  //Reset Password Function
  resetPassword(email:string){
    return sendPasswordResetEmail(this.auth,email);
  }
}
