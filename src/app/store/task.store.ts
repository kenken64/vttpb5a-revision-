
import { Task } from '../models/task.model';
import { TaskSlice } from '../models/task-slice.model';
import { ComponentStore } from '@ngrx/component-store';
import { v4 as uuidv4 } from 'uuid';
import { TaskDb } from '../component/shared/task.db';
import { inject } from '@angular/core';
import { catchError, concatMap, EMPTY, from, mergeMap, Observable, tap } from 'rxjs';

const  INIT: TaskSlice = {
    tasks: [],
    audit: [],
    priorityFilter: 'all'
}

export class TaskStore extends ComponentStore<TaskSlice> {

    private taskDb = inject(TaskDb);

    constructor() {
        // init to empty array
        super(INIT);
    }


    readonly saveTask = this.effect(
        (task$: Observable<Task>) => task$.pipe(
            mergeMap( newTask => {
                const toSaveTask = {
                    ...newTask,
                    id: uuidv4().substring(0, 8)
                }
                return  from(this.taskDb.saveTask(toSaveTask));
            }),
            tap(newTask => this.addTask(newTask)),
            catchError(() => EMPTY)
        )
    );

    readonly removeTask = this.effect(
        (taskId$: Observable<string>)=> taskId$.pipe(
                concatMap((id) => from(this.taskDb.removeTask(id))
            ),
            tap(id => this.deleteTask(id) ),
        )
    )
    

    // mutator - for add task -- update methods
    // addTask(task) - add task to the store list
    readonly addTask = this.updater<Task>((slice: TaskSlice , newTask: Task) => {
        const toSaveTask : Task = {...newTask, id: newTask.id};
        this.taskDb.saveTask(toSaveTask);
        return { 
            tasks: [...slice.tasks, toSaveTask],
            audit: [...slice.audit, 
                    `Task ${toSaveTask.name} added. ${new Date().toLocaleString()}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice;
    });

    
    // mutator for deleting a task
    readonly deleteTask = this.updater<string>((slice: TaskSlice , taskid: string) => {
        //this.taskDb.removeTask(taskid);
        return { 
            tasks: slice.tasks.filter((task: Task) => task.id !== taskid),
            audit: [...slice.audit, 
                    `Task deleted. ${new Date().toLocaleString()}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice;
    });
    
    readonly getTasks$ = (priority: string) => {
        return this.select<Task[]>
            ((slice: TaskSlice) => slice.tasks.filter(t => (priority === 'all') || (t.priority === priority)))
    }

    // selector query the state get count of tasks
    readonly getTaskCount$ = this.select<number>((slice: TaskSlice) => {
        return slice.tasks.length;
    });


}