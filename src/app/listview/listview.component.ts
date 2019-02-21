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

  mainList = {
    todo: [],
    progress: [],
    done: [],
    cancelled: [],
    delete: []
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(task => {

      task.filter(item => item.list == 'todo').map(item => this.mainList.todo.push(item));
      task.filter(item => item.list == 'progress').map(item => this.mainList.progress.push(item));
      task.filter(item => item.list == 'done').map(item => this.mainList.done.push(item));
      task.filter(item => item.list == 'cancelled').map(item => this.mainList.cancelled.push(item));
      task.filter(item => item.list == 'delete').map(item => this.mainList.delete.push(item));

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
    this.mainList.delete.splice(0);
  }


}
