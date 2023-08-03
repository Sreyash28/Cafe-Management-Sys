import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMassage: string = '';

  user: User = {
    email: '',
    password: '',
  };

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.login(this.user).subscribe({
      next: (response) => {
        alert('User Logged-In Successfully');
        this.service.saveAuthorizationToken(response.token, response.userId);
        this.router.navigateByUrl('home');
      },
      error: (error) => {
        this.errorMassage = error.error.message;
        alert('Invalid details...!');
      },
      complete: () => console.info('complete'),
    });
  }
}
