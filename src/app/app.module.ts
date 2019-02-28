import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TasksService } from './services/tasks.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,

  ],

  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'get-things-done'),
    AngularFirestoreModule,
    AppRoutingModule,

  ],

  schemas: [
    NO_ERRORS_SCHEMA,
  ],

  entryComponents: [],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
