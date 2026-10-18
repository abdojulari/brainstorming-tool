import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.apiUrl}/login`;
  private logoutUrl = `${environment.apiUrl}/logout`;

  constructor(private http: HttpClient) { }

  public isAuthenticated() {
    // Check whether the token is expired and return
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      return true;
    }
    return false;
  }

  public getUser(): string {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      return (JSON.parse(userData)).user.name;
    }
    return '';
  }
  public setUserInfo(response: { user?: { name?: string; username?: string } }) {
    const user = response?.user;
    localStorage.setItem('userInfo', JSON.stringify({
      user: {
        name: user?.name || '',
        username: user?.username || '',
      },
    }));
  }

  public login(username: string, password: string) {
    // Set withCredentials option to true
    const options = { withCredentials: true };
    const body = { username: username, password: password };
    return this.http.post(this.loginUrl, body, options);
  }

  public logout() {
    localStorage.removeItem('userInfo');
    return this.http.get(this.logoutUrl, { withCredentials: true });
  }
}