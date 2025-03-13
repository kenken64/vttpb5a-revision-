import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStore } from '../store/task.store';

@Component({
    selector: 'app-task-count',
    templateUrl: './task-count.component.html',
    styleUrl: './task-count.component.css',
    standalone: false
})
export class TaskCountComponent implements OnInit { 
    private taskStore = inject(TaskStore);
    protected taskCount$! : Observable<number>;

    ngOnInit() {
        this.taskCount$ = this.taskStore.getTaskCount$;
    }
}
