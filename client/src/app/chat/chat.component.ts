import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { LoginService } from '../services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private io = io(environment.apiUrl, {
    withCredentials: true
  });
  public user: string;
  public message: string = '';
  
  constructor( private loginService:  LoginService) { 
    this.user = this.loginService.getUser();
  }

  ngOnInit(): void {
    this.io.on('chat message', (msg) => {
      const user = msg.user;
      const messageContent = msg.message;
      const item = document.createElement('li');
      item.textContent = `${user}: ${messageContent}`;
      document.getElementById('messages')?.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  public sendMessage(): void {
      if (this.message) {
          const messageObj = {
            user: this.user,
            message: this.message
          };
          this.io.emit('chat message', messageObj);
          this.message = '';
      }
  }

  public checkCharacterCount(): void {
      const maxCharacterCount = 200;
      const inputElement = document.querySelector('input[name="message"]');

      if (this.message.length >= maxCharacterCount) {
          inputElement?.classList.add('overflow-y-auto');
      } else {
          inputElement?.classList.remove('overflow-y-auto');
      }
  }

}
