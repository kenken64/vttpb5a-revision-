import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './component/task.component';
import { TaskListComponent } from './component/task-list.component';
import { TaskCountComponent } from './component/task-count.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStore } from './store/task.store';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskListComponent,
    TaskCountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    TaskStore,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
