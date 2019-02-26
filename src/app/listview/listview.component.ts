import { map } from 'rxjs/operators';
import { Tasks } from './../tasks';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from '../services/tasks.service';
import { element } from '@angular/core/src/render3';




@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})

export class ListviewComponent implements OnInit {

  constructor(private taskService: TasksService) { }

  listLoaded: boolean = false;
  editState: boolean = false;
  itemToEdit: Tasks;
  currentTask = { id: '', title: '', note: '', dateAdded: '', list: '' };

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
    //  console.log("start of app with listLoaded set on: " + this.listLoaded)
    console.log("ngOnInit initialize")
    console.log("listloaded: " + this.listLoaded);
    //   if (!this.listLoaded) {
    //   this.loadAllList();
    //  }
  }

  loadAllList() {

    if (!this.listLoaded) {

      this.taskService.getTasks().subscribe(task => {

        task.filter(item => item.list == 'todo').map(item => this.mainList.todo.push(item));
        task.filter(item => item.list == 'progress').map(item => this.mainList.progress.push(item));
        task.filter(item => item.list == 'done').map(item => this.mainList.done.push(item));
        task.filter(item => item.list == 'cancelled').map(item => this.mainList.cancelled.push(item));
        task.filter(item => item.list == 'delete').map(item => this.mainList.delete.push(item));
        this.listLoaded = true;
        console.log("loadAllList with listLoaded set on: " + this.listLoaded)
        console.log("task loaded by loadAllList()");
        console.log("listloaded: " + this.listLoaded);
      })
    }
  }


  drop(event: CdkDragDrop<Tasks[]>) {

    itemToUpdate: event.container.data

    console.log("drop function");
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

      event.container.data.map(element => {
        element.list = event.container.id;
        this.updateTask(element);
      })


      /*   event.container.data.forEach(element => {
           element.list = event.container.id;
           this.updateTask(element); 
   
         }) */
    }
  }

  clearState() {
    console.log("clearState");
    this.editState = false;
    this.itemToEdit = null;
  }

  changeModal(item: any) {
    console.log("changeModal");
    this.currentTask = item;
    this.clearState();
  }

  addTask() {
    console.log("addTask");
    if (this.task.title != '' && this.task.list != '') {
      this.taskService.addItem(this.task);
      this.task.title = '';
      this.task.note = '';
    }
  }

  editTask(event, item: Tasks) {
    console.log("editTask");
    this.editState = true;
    this.itemToEdit = item;
    console.log(this.editState);
  }

  updateTask(item: Tasks) {
    console.log("updateTask()");
    this.taskService.updateItem(item);
    //this.clearState();
  }


  clearList() {
    console.log("clearList");
    this.mainList.delete.forEach(element => {
      this.taskService.deleteItem(element);
    })
  }


}
