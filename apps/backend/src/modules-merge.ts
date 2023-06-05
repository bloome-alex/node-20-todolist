import { z } from 'zod'

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

//@import types

import { types as baseTypes, resolvers as baseResolvers } from './modules/base/index.js'
import { types as taskTypes, resolvers as taskResolvers } from './modules/tasks/index.js'

//@import resolvers

import { MergedResolversSchema } from './modules-merge.z.js'


const mergedTypes = mergeTypeDefs([
    baseTypes,
    taskTypes
])

const mergedResolvers : z.infer<typeof MergedResolversSchema> = mergeResolvers([
    baseResolvers,
    taskResolvers
])

export const typeDefs = mergedTypes
export const resolvers = mergedResolvers
