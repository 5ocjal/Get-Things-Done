import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';





@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,


  ],
  imports: [
    BrowserModule,
    DragDropModule,
    MDBBootstrapModule.forRoot(),
    
    
  ],

  schemas: [
    NO_ERRORS_SCHEMA,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
