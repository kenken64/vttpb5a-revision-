import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Task } from "../../models/task.model";

@Injectable(
    { providedIn: "root" }
)
export class TaskDb extends Dexie {

    tasks: Dexie.Table<Task, string>;

    constructor() {
        super("TaskDb");
        this.version(1).stores({
            tasks: "id"
        });
        this.tasks = this.table("tasks");
    }

    removeTask(id: string){
        return this.tasks.delete(id).then(() => id);
    }

    saveTask(task: Task): Promise<Task> {
        return this.tasks.put(task).then(() => task);
    }

    getAllTasks(): Promise<Task[]> {
        return this.tasks.toArray();
    }
}