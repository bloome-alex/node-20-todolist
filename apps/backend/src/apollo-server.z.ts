import { z } from 'zod'

import { ApolloServer } from '@apollo/server'

export const ServerSchema = z.instanceof(ApolloServer)