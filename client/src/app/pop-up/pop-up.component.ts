import { Component, EventEmitter, Input, Output } from '@angular/core';

  @Component({
    selector: 'app-pop-up',
    templateUrl: './pop-up.component.html',
  })
  export class PopUpComponent { 
    @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() public savedStage: any;
    public isShow: boolean;
    constructor() {
        this.isShow = true;
    }

    public close(): void {
        this.isShow = !this.isShow;
    }

    public onConfirm(): void {
        // Emit the confirmation event with a value indicating if the user pressed "yes"
        this.confirm.emit(true);
        this.isShow = !this.isShow;
      }

  }