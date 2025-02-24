import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpProviderService } from '../service/login/http-provider.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor( private router: Router, private httpProvider: HttpProviderService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.loginData.username && this.loginData.password) {
      this.httpProvider.validateUser(this.loginData.username, this.loginData.password).subscribe(
        success => {
          if (success) {
            // Redirect user to home page
            this.router.navigate(['/home']);
          } else {
            // show error message
            this.errorMessage = 'Incorrect username or password.';
          }
        },
        error => {
          // authentication error
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
      );
    }
  }
}
