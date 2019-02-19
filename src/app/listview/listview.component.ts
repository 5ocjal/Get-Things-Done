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
    dateAdded: '',
  }

  

  todo: Tasks[] = [];
  progress: Tasks[] =[];
  done: Tasks[] = [];
  cancelled: Tasks[] = [];
  delete: Tasks[] = [];

  

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.todo = tasks; 
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

  onSubmit(){
    if (this.task.title !=''){
      this.taskService.addItem(this.task);
      this.task.title = '';
      this.task.note = '';

    }
  }

  clearList(list: string, todo: string) {
    this.delete.splice(0);
  }


}
