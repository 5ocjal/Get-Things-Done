import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Tasks } from '../tasks';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'dns';




@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Tasks>
  tasks: Observable<Tasks[]>;

  constructor(public firestore: AngularFirestore) {
    this.tasks = this.firestore.collection('tasks').valueChanges();

   }

   getTasks(){
     return this.tasks;
   }


}
