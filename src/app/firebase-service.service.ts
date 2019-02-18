import { Injectable } from '@angular/core';
import { config} from './firebase.config';
import { Tasks} from './tasks';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private dataBase: AngularFirestore) {

    this.tasks = dataBase.collection<Tasks>(config.collection_endpoint);

   }

  tasks: AngularFirestoreCollection<Tasks>;
  private taskDocument: AngularFirestoreDocument<Tasks>;


  addTask(task){
    this.tasks.add(task);
  }
  updateTask(id, update){
    this.taskDocument = this.dataBase.doc<Tasks>
    (`${config.collection_endpoint}/${id}`);

    this.taskDocument.update(update);

  }

  deleteTask(id) {

    this.taskDocument = this.dataBase.doc<Tasks>
    (`${config.collection_endpoint}/${id}`)

    this.taskDocument.delete();
 } 
  

}


