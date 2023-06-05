import { z } from 'zod'

import { fetchTasksSchema, deleteTaskReturnsSchema, updateTaskReturnsSchema, createTaskReturnsSchema } from '../../services/taskServices.z.js'

export const ResolversSchema = z.object({
    Query: z.object({
        fetchTasks: fetchTasksSchema
    }),
    Mutation: z.object({
        createTask: z.function()
            .args(z.unknown(), z.object({
                input: z.object({
                    author: z.string(),
                    title: z.string(),
                    checked: z.boolean()
                })
            }))
            .returns(createTaskReturnsSchema),
        updateTask: z.function()
            .args(z.unknown(), z.object({
                input: z.object({
                    id: z.string(),
                    author: z.union([z.string(), z.undefined()]),
                    title: z.union([z.string(), z.undefined()]),
                    checked: z.union([z.boolean(), z.undefined()])
                })
            }))
            .returns(updateTaskReturnsSchema),
        deleteTask: z.function()
            .args(z.unknown(), z.object({
                id: z.string(),
            }))
        .returns(deleteTaskReturnsSchema)
    })
})