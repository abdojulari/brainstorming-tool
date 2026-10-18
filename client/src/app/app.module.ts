import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import * as Services from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StickyNoteComponent } from './sticky-note/sticky-note.component';
import { NoteComponent } from './note/note.component';
import { AngularResizeEventModule } from 'angular-resize-event';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PopUpComponent } from './pop-up/pop-up.component';



@NgModule({
  declarations: [
    AppComponent,
    WhiteboardComponent,
    StickyNoteComponent, 
    NoteComponent, 
    ChatComponent, 
    LoginComponent, 
    HomeComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularResizeEventModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Services.KonvaService,
    Services.LoginService,
    Services.AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
