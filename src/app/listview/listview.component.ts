import { Component, OnInit } from '@angular/core';
import { Tasks } from '../tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})

export class ListviewComponent implements OnInit {

  currentItem = { title: '', note: '', dateAdded: '' };

  constructor() { }

  ngOnInit() {
  }


  public todo: Tasks[] = [];

  public progress: Tasks[] = [];

  public done: Tasks[] = [];

  public cancelled: Tasks[] = [];

  public delete: Tasks[] = [];


  drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  changeModal(item: any) {
    this.currentItem = item;
    console.log(this.currentItem);

  }
  addItem(list: string, todo: string, note: string, ) {
    if (list === 'todo') {
      this.todo.push({ title: todo, note: note, dateAdded: new Date().toString() });
    } else if (list === 'done') {
      this.done.push({ title: todo, note: note, dateAdded: new Date().toString() });
    } else if (list === 'progress') {
      this.progress.push({ title: todo, note: note, dateAdded: new Date().toString() });
    } else {
      this.cancelled.push({ title: todo, note: note, dateAdded: new Date().toString() })
    }
  }
  onClickMe() {
    console.log('You are my hero!');
  }
  clearList(list: string, todo: string) {
    this.delete.splice(0);
  }


}
