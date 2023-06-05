import { z } from 'zod'

export const ServerStartingSchema = z.object({
    url: z.string()
})