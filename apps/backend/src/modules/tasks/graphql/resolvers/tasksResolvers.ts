import { z } from 'zod'

import { ResolversSchema } from './tasksResolvers.z.js';

import { fetchTasks, createTask, updateTask, deleteTask } from '../../services/taskServices.js'

const resolvers : z.infer<typeof ResolversSchema> = {
    Query: {
        fetchTasks: fetchTasks,
    },
    Mutation: {
      createTask: async(_:unknown, {input: {author, title, checked} }: {input: {author:string, title:string, checked:boolean}}) => {
        return await createTask({author, title, checked})
      },
      updateTask: async(_:unknown, {input: {id, author, title, checked} }: {input: {id:string, author?:string, title?:string, checked?:boolean}}) => {
        return await updateTask(id, {author, title, checked})
      },
      deleteTask: async(_:unknown, {id}: {id:string}) => {
        return await deleteTask(id)
      },
    }
};

export default resolvers