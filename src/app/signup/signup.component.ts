import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  errorMassage: string = '';

  user: User = {
    email: '',
    password: '',
    userName: '',
    contactNumber: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('User Registered Successfully');
        this.authService.saveAuthorizationToken(
          response.token,
          response.userId
        );
        this.router.navigateByUrl('home');
      },
      error: (error) => {
        this.errorMassage = error.error.message;
        alert('Registration Failed');
      },
      complete: () => console.info('complete'),
    });
  }
}
