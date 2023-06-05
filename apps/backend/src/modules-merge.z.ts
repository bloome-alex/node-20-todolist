import { z } from 'zod'

export const MergedResolversSchema = z.object({
    Query: z.object({name: z.string()}).partial(),
    Mutation: z.object({name: z.string()}).partial()
}).partial()