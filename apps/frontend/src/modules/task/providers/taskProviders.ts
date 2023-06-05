import { z } from 'zod'

import apolloClient from '../../../apollo'
import { gql } from 'graphql-tag'

import { ApolloClientSchema } from '../../../apollo/index.z'

import { BaseProviderInterface, createTaskArgsSchema, updateTaskArgsSchema } from './taskProviders.z'

import fetchTasks from './gqlc/fetchTasks.graphql'
import createTask from './gqlc/createTask.graphql'
import updateTask from './gqlc/updateTask.graphql'
import deleteTask from './gqlc/deleteTask.graphql'

class TaskProvider implements BaseProviderInterface{
    gqlc: z.infer<typeof ApolloClientSchema>;

    constructor(apolloClient: z.infer<typeof ApolloClientSchema>) {
        this.gqlc = apolloClient
    }

    fetchTask(){
        return this.gqlc.query({
            query: gql`${fetchTasks}`,
            'fetchPolicy': 'network-only'
        })
    }

    createTask({title, author, checked = false} : z.infer<typeof createTaskArgsSchema>){
        console.log({title, author, checked})
        return this.gqlc.mutate({
            mutation: gql`${createTask}`,
            variables: { 
                input: { title, author, checked }
            }
        })
    }

    updateTask({id, title, author, checked} : z.infer<typeof updateTaskArgsSchema>){
        return this.gqlc.mutate({
            mutation: gql`${updateTask}`,
            variables: {
                input: { id, title, author, checked }
            }
        })
    }

    deleteTask(id:string){
        return this.gqlc.mutate({
            mutation: gql`${deleteTask}`,
            variables: {id}
        })
    }
}

const TaskProviderSchema = z.instanceof(TaskProvider)

const taskProvider : z.infer<typeof TaskProviderSchema> = new TaskProvider(apolloClient)

export default taskProvider

