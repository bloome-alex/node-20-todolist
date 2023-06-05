import { z } from 'zod'

import { ApolloClientSchema } from "../../../apollo/index.z";

import { ApolloQueryResult, FetchResult } from '@apollo/client';

export interface GqlcInterface {
    query: (params: string) => Promise<any>;
}

export interface BaseProviderInterface {
    gqlc: z.infer<typeof ApolloClientSchema>;
    fetchTask(): Promise<ApolloQueryResult<any>>;
    createTask({title, author, checked}:z.infer<typeof createTaskArgsSchema>): Promise<FetchResult<any>>;
    updateTask({id, title, author, checked}:z.infer<typeof updateTaskArgsSchema>): Promise<FetchResult<any>>;
    deleteTask(id:string): Promise<FetchResult<any>>;
}

export const createTaskArgsSchema = z.object({
    title: z.string(),
    author: z.string(),
    checked: z.boolean()
}).partial()

export const updateTaskArgsSchema = z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    checked: z.boolean()
}).partial()