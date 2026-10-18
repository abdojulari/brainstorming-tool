import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  Output, 
  ViewChild 
} from '@angular/core';
import { Draggable } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent  implements AfterViewInit{

  public recognition: any;

  @Input() public color: string = '';
  @Input() public noteId: number = 0;
  @Output() public dismiss = new EventEmitter();
  @Output() public focusout = new EventEmitter();
  public vote: number = 0;
  public voteScore: any = [];
  public elements: any = [];
  public counter: number = 0;
  
  @ViewChild('ele',{static: false}) public element:any;
  @ViewChild('buildOn',{static: false}) public buildOn:any;
  
  public constructor(private el:ElementRef) { 

    this.element = document.getElementById('mydiv')
    const {webkitSpeechRecognition} : any = <any>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event: { results: { transcript: any; }[][]; })=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      document.getElementById('toolbar')?.focus();
    };
  }

  public onBuildOn() {
    this.counter++;
    this.elements.push({
      id: 1,
      content: '',
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    });
    
  }

  public onDismiss(event: any){
    this.dismiss.emit(event);
  }
  
  public onFocusOut(event: any){
    this.focusout.emit(event)
  }

  public deleteNote(event: any){
    const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    this.elements.forEach((note: any, index: any)=>{
     if(note.id== id) {
       this.elements.splice(index,1);
       localStorage.setItem('elements', JSON.stringify(this.elements));
       return;
     }
   });
 }

  /**
   * The function starts the speech recognition service
   * @param {any} event - The event that triggered the function.
   */
  public record(event: any) {
    this.recognition.start();
  }

    /**
     * "After the view has been initialized, create a new Draggable object, passing in the
     * nativeElement of the component as the first parameter, and an object literal as the second
     * parameter, with the clone property set to false."
     * 
     * The clone property is set to false because we don't want to clone the element. We want to move
     * the element itself
     */
    public ngAfterViewInit(): void {
        new Draggable(this.element.nativeElement, { clone: false });
    }

    public voteIdea(id: number): void {
     
      const index = this.voteScore.findIndex((element: { id: number; }) => element.id === id);
      if (index >= 0) {
          // If the id already exists in the array, update the vote count
          this.voteScore[index].vote += 1;
          this.vote = this.voteScore[index].vote;
      } else {
          // If the id does not exist in the array, add a new entry with a vote count of 1
          this.voteScore.push({
              id: id,
              vote: 1
          });
      }
    }
 
}
