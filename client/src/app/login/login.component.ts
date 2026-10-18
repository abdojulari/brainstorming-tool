import { Component } from '@angular/core';
import { LoginService } from '../services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public password: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { 
    this.username = '';
    this.password = '';
  }

  public login() {
    this.loginService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          // Handle successful login response, e.g., store token in local storage
          this.loginService.setUserInfo(response);
          // redirect to a route
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // Handle login error
          console.error('Login failed', error.status);
        }
      });
  }

}
