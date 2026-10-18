import { Injectable } from '@angular/core';
import { LoginService } from '../index';
import { 
  CanActivate, 
  Router 
}  from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private loginService: LoginService,
    private route: Router
  ) { }

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
