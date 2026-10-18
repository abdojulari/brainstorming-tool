import { Component } from '@angular/core';
import { LoginService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public whiteBoardSelected: boolean;
  public isAuthenticated: boolean;
  public user: string;
  constructor(
    private loginService:  LoginService,
    private router: Router
  ) { 
      this.whiteBoardSelected = true;
      this.isAuthenticated = this.loginService.isAuthenticated();
      this.user = this.loginService.getUser();
  }

  public logout(){
    this.loginService.logout()
      .subscribe({
        next: (response) => {     
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout failed', error.status);
        }
      });

  }

}
