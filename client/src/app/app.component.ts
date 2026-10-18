import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
   
  public whiteBoardSelected: boolean;
  public constructor() {
    this.whiteBoardSelected = true;
  }

}
