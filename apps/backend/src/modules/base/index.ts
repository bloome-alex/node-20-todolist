import { z } from 'zod'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import booksResolvers from './graphql/resolvers/booksResolver.js'

import { TypeDefsArraySchema, MergedResolversSchema } from './index.z.js'
import { fileURLToPath } from 'url'

const typeDefsArray : z.infer<typeof TypeDefsArraySchema> = 
    loadFilesSync(
        path.join(
            typeof __dirname === 'undefined' ? path.dirname(fileURLToPath(import.meta.url)) : __dirname, 
            './graphql/types'
        )
    )

const mergedTypes = mergeTypeDefs(typeDefsArray)
const mergedResolvers : z.infer<typeof MergedResolversSchema> = mergeResolvers([booksResolvers])

export const types = mergedTypes
export const resolvers = mergedResolvers