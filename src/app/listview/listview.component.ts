import { Component, OnInit } from '@angular/core';
import { Tasks } from '../tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';




@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})

export class ListviewComponent implements OnInit {

  constructor(private taskService: TasksService) { }

  currentTask = { title: '', note: '', dateAdded: '' };

  task: Tasks = {
    title: '',
    note: '',
    dateAdded: new Date().toString(),
    list: '',
  }

  todo: Tasks[] = [];
  progress: Tasks[] = [];
  done: Tasks[] = [];
  cancelled: Tasks[] = [];
  delete: Tasks[] = [];


  ngOnInit() {
    this.taskService.getTasks().subscribe(task => {

      if (this.task.list == 'todo') {
        this.todo = task;

      } else if (this.task.list == 'progress') {
        this.progress = task;
      }

      /*    switch(this.task.list) {
            case "todo": {
              this.todo = task;
              break;
            }
            case 'progress': {
              this.progress = task;
              break;
            }
            case 'done': {
              this.done = task;
              break;
            }
            case 'cancelled': {
              this.cancelled = task;
              break;
            }
            case 'delete': {
              this.delete = task;
              break;
            }
            default: {
              console.log("Coś poszło nie tak");
              break;
            }
          } */

    });
  }

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
    this.currentTask = item;
  }

  onSubmit() {
    if (this.task.title != '' && this.task.list != '') {
      this.taskService.addItem(this.task);
      this.task.title = '';
      this.task.note = '';

    }
  }

  clearList(list: string, todo: string) {
    this.delete.splice(0);
  }


}
