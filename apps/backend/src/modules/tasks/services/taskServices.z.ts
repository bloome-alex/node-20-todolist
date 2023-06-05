import { z } from 'zod'

export const taskArgsSchema = z.object({
    author: z.string(),
    title: z.string(),
    checked: z.boolean()
})

export const partialTaskArgsSchema = z.object({
    author: z.union([z.string(), z.undefined()]),
    title: z.union([z.string(), z.undefined()]),
    checked: z.union([z.boolean(), z.undefined()])
}).partial()

export const createTaskReturnsSchema = z.promise(z.union([taskArgsSchema, z.unknown()]))

export const createTaskSchema = z.function()
    .args(taskArgsSchema)
    .returns(createTaskReturnsSchema)

export const updateTaskReturnsSchema = z.promise(z.union([taskArgsSchema, z.unknown()]))

export const updateTaskSchema = z.function()
    .args(z.string(), partialTaskArgsSchema)
    .returns(updateTaskReturnsSchema)

export const deleteTaskReturnsSchema = z.promise(z.union([taskArgsSchema, z.unknown()]))

export const deleteTaskSchema = z.function()
    .args(z.string())
    .returns(deleteTaskReturnsSchema)

export const fetchTasksReturnsSchema = z.promise(z.union([z.array(taskArgsSchema), z.unknown()]))

export const fetchTasksSchema = z.function()
    .returns(fetchTasksReturnsSchema)