import { Component, OnInit } from '@angular/core';
import { Tasks } from '../tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


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


  public todo: Tasks[] = [
    { title: 'start new app', note: 'Jest dostępnych wiele różnych wersji Lorem Ipsum, ale większość zmieniła się pod wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar użyć fragmentu Lorem Ipsum, lepiej mieć pewność, że nie ma niczego „dziwnego” w środku tekstu.', dateAdded: new Date().toString() },
    { title: 'drink some tea', note: 'works', dateAdded: new Date().toString() },
    { title: 'do not be a lazy motherfucker', note: 'works', dateAdded: new Date().toString() },
  ];

  public progress: Tasks[] = [
    {title: 'try to survive', note: 'works', dateAdded: new Date().toString()},
  ]

  public done: Tasks[] = [
    { title: 'go to work', note: 'works', dateAdded: new Date().toString() },
  ];

  public cancelled: Tasks[] = [
    { title: 'be productive', note: 'works', dateAdded: new Date().toString() },
  ];

  public delete: Tasks[] = [
    { title: 'graduate Kod do Kariery', note: 'works', dateAdded: new Date().toString() },
  ];


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
      this.todo.push({ title: todo, note: note, dateAdded: new Date().toString()});
    } else if (list === 'done') {
      this.done.push({ title: todo, note: note, dateAdded: new Date().toString()});
    } else if(list === 'progress' ){
      this.progress.push({ title: todo, note: note, dateAdded: new Date().toString()});
    } else {
      this.cancelled.push({ title: todo, note: note, dateAdded: new Date().toString()})
    }
  }
  onClickMe() {
    console.log('You are my hero!');
  }
  clearList(list: string, todo: string) {
    this.delete.splice(0);
  }


}
