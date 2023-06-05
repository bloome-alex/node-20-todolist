import { z } from 'zod'

import { BookSchema } from '../../models/Books.z.js'

export const ResolversSchema = z.object({
    Query: z.object({
        books: z.function().returns(z.promise(z.array(BookSchema)))
    }),
    Mutation: z.object({
        createBook: z.function()
            .args(z.unknown(), z.object({
                input: z.object({
                    author: z.string(),
                    title: z.string()
                })
            }))
            .returns(z.union([z.promise(BookSchema), z.unknown()])),
        updateBook: z.function()
            .args(z.unknown(), z.object({
                input: z.object({
                    id: z.string(),
                    author: z.string(),
                    title: z.string()
                })
            }))
            .returns(z.union([z.promise(BookSchema), z.unknown()])),
        deleteBook: z.function()
            .args(z.unknown(), z.object({
                input: z.object({
                    id: z.string()
                })
            }))
            .returns(z.union([z.promise(BookSchema), z.unknown()]))
    })
})