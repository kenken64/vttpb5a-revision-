import { Component, inject, OnInit } from '@angular/core';
import { TaskStore } from '../store/task.store';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css',
    standalone: false
})
export class TaskListComponent implements OnInit {
    private taskStore = inject(TaskStore);
    protected tasks$! : Observable<Task[]>;
    protected allTasks : Task[] = [];

    ngOnInit() {
        this.tasks$ = this.taskStore.getTasks$('all');
        console.log(this.tasks$);
    }

    filterByPriority(event: any){
        let priorityVal = event.target.value;
        console.log("priorityVal >> ", priorityVal);
        this.tasks$ = this.taskStore.getTasks$(priorityVal);
    }

    deleteTask(taskid: string){
        console.log("Delete task >> ${taskid}", taskid);
        this.taskStore.removeTask(taskid);
    }
}
