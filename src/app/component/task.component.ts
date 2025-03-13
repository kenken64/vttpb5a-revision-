import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../models/task.model';
import { TaskStore } from '../store/task.store';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
    standalone: false
})
export class TaskComponent  implements OnInit {
    private fb = inject(FormBuilder);
    private taskStore = inject(TaskStore);
    protected form!: FormGroup;

    ngOnInit() { 
        this.form = this.createForm();    
    }

    processForm(){
        console.log(this.form.value);

        const newTask : Task = {
            id: '',
            ...this.form.value
        }
        console.log(newTask);
        this.taskStore.addTask(newTask);
        this.form = this.createForm();
    }

    createForm(){
        return this.fb.group({
            name:  this.fb.control<string>(''),
            priority:  this.fb.control<string>('low'),
        })
    }

}
