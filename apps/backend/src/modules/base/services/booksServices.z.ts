import { z } from 'zod'
import { BookSchema } from '../models/Books.z.js'

export const FetchBooksSchema = z.function()
    .returns(z.promise(z.array(BookSchema)))

export const CreateBooksSchema = z.function()
    .args(z.object({
        author: z.string(),
        title: z.string()
    }))
    .returns(z.union([z.promise(BookSchema), z.unknown()]))

export const UpdateBookSchema = z.function()
    .args(z.string(), z.object({
        author: z.string(),
        title: z.string()
    }).partial())
    .returns(z.union([z.promise(BookSchema), z.unknown()]))

export const deleteBookSchema = z.function()
    .args(z.string())
    .returns(z.union([z.promise(BookSchema), z.unknown()]))