import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyNoteComponent {
  
  @ViewChild('droppable',{static: false})element: any;
  public notes: any = [];
  public recognition:any;
  public color: string = '#edd70b';
  public color$ = new Subject<string>();
  

  constructor(private el:ElementRef) {

    const local = localStorage.getItem('notes');
    this.notes = JSON.parse(local!) || [{ id: 0, content:'', color: this.color }];

    const {webkitSpeechRecognition} : any = <any>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event: { results: { transcript: any; }[][]; })=> {
      this.el.nativeElement.querySelectorAll(".content")[0].innerText = event.results[0][0].transcript
    };
  }

  // stickyNote 

  public updateAllNotes() {
    let notes = document.querySelectorAll('app-note');

    notes.forEach((note: any, index: number) =>{
        this.notes[note.id].content = note.querySelector('.content').innerHTML;
    });
    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  public addNote () {
   
    this.notes.push({ id: this.notes.length + 1,content:'', color: this.color});
    // sort the array
    this.notes = this.notes.sort((a: { id: number; },b: { id: number; })=>{ return b.id-a.id});
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };

  public saveNote(event: any){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  
  public updateNote(newValue: { id: any; content: any; }){
    this.notes.forEach((note: { id: any; }, index: string | number)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  public deleteNote(event: any){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     this.notes.forEach((note: any, index: any)=>{
      if(note.id== id) {
        this.notes.splice(index,1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        return;
      }
    });
  }

  public record(event: any) {
    this.recognition.start();
    this.addNote();
  }

  // public changeColor() {
  //   this.color$.subscribe(color => {  
  //     this.color = color;
  // });
  // }

}
