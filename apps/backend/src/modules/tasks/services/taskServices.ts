import { z } from 'zod'
import Task from '../model/Task.js';
import { taskArgsSchema, createTaskSchema, updateTaskSchema, partialTaskArgsSchema, deleteTaskSchema, fetchTasksSchema } from './taskServices.z.js';

export const createTask : z.infer<typeof createTaskSchema> = async ({author, title, checked} : z.infer<typeof taskArgsSchema>) => {
    const task = new Task({author, title, checked})
    return await task.save()
}

export const updateTask : z.infer<typeof updateTaskSchema> = async(id: string, {author, title, checked} : z.infer<typeof partialTaskArgsSchema>) => {
    return await Task.findByIdAndUpdate(id, {author, title, checked}, {new: true})
}

export const deleteTask : z.infer<typeof deleteTaskSchema> = async (id:string) => {
    return await Task.findByIdAndDelete(id)
}

export const fetchTasks : z.infer<typeof fetchTasksSchema> = async () => {
    return await Task.find({})
}