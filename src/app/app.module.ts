import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';

@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
