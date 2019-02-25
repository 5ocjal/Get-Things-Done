import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Tasks } from '../tasks';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TasksService {


  tasks: Observable<Tasks[]>;
  tasksDocument: AngularFirestoreDocument;
  tasksCollection: AngularFirestoreCollection<Tasks>

  constructor(public firestore: AngularFirestore) {

    this.tasksCollection = this.firestore.collection('tasks');
    this.tasks = this.tasksCollection.snapshotChanges().pipe(map(changes => changes.map(
      a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data }
      }
    )
    ))
  }

  getTasks() {
    return this.tasks;
  }

  addItem(item: Tasks) {
    this.tasksCollection.add(item);
  }

  updateItem(item: Tasks) {
    this.tasksDocument = this.firestore.doc(`tasks/${item.id}`);
    console.log(`tasks/${item.id}`)
    this.tasksDocument.update(item);
    
  }

  deleteItem(item: Tasks) {
    this.tasksDocument = this.firestore.doc(`task/${item.id}`);
    console.log("deleteItem");
    console.log(item);
    this.tasksDocument.delete();
  }


}
