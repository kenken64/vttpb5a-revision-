
import { Task } from '../models/task.model';
import { TaskSlice } from '../models/task-slice.model';
import { ComponentStore } from '@ngrx/component-store';
import { v4 as uuidv4 } from 'uuid';

const  INIT: TaskSlice = {
    tasks: [],
    audit: [],
    priorityFilter: 'all'
}

export class TaskStore extends ComponentStore<TaskSlice> {
    constructor() {
        // init to empty array
        super(INIT);
    }

    // mutator - for add task -- update methods
    // addTask(task) - add task to the store list
    readonly addTask = this.updater<Task>((slice: TaskSlice , newTask: Task) => {
        const toSaveTask : Task = {...newTask, id: uuidv4().substring(0, 8)};
        return { 
            tasks: [...slice.tasks, toSaveTask],
            audit: [...slice.audit, 
                    `Task ${toSaveTask.name} added. ${new Date().toLocaleString()}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice;
    });

    
    // mutator for deleting a task
    readonly removeTask = this.updater<string>((slice: TaskSlice , taskid: string) => {
        return { 
            tasks: slice.tasks.filter((task: Task) => task.id !== taskid),
            audit: [...slice.audit, 
                    `Task deleted. ${new Date().toLocaleString()}`],
            priorityFilter: slice.priorityFilter
        } as TaskSlice;
    });

    // Selector query - get all tasks 
    // readonly getTasks$ = this.select<Task[]>((slice: TaskSlice) => {
    //     return slice.tasks.filter(t => 
    //         (slice.priorityFilter === 'all' || t.priority === slice.priorityFilter));
    // });


    // Selector query - get all tasks 
    readonly getTasks$ = this.select<Task[]>((slice: TaskSlice) => 
        slice.tasks.filter(t => 
            (slice.priorityFilter === 'all' || t.priority === slice.priorityFilter))
    );

    // selector query the state get count of tasks
    readonly getTaskCount$ = this.select<number>((slice: TaskSlice) => {
        return slice.tasks.length;
    });


}