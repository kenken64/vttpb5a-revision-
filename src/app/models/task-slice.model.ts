import { Task } from "./task.model"

export interface TaskSlice {
    tasks:  Task[]
    audit: string[]
    priorityFilter: string
}