import { z } from 'zod'

export const MongoConnectSchema = z.function()
    .returns(z.promise(z.union([z.string(), z.instanceof(Error)])))

export const connectToMongoSchema = z.function()
    .args(z.string())
    .returns(z.promise(z.union([
        z.string().refine(value => value === 'mongoose connected',{
            message: 'Should be return string of message "mongoose connected"'
        }), 
        z.instanceof(Error)
    ])))

    