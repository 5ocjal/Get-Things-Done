import { Component, OnInit } from '@angular/core';
import { Tasks } from '../tasks';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';
import { map, takeLast } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';




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
    todo : [],
    progress: [],
    done: [],
    cancelled: [],
    delete: []
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(task => {

      console.log(task);

      task.filter(item => item.list == 'progress').map( item =>  this.mainList.progress.push(item) )
       
      
      console.log(this.mainList.progress)
    });

    
    
}

drop(event: CdkDragDrop<Tasks[]>) {
  if(event.previousContainer === event.container) {
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
