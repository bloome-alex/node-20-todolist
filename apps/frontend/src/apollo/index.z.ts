import { z } from 'zod'

import { ApolloClient, InMemoryCache } from '@apollo/client/core'

import { ApolloLink } from '@apollo/client/core'

export const InMemoryCacheSchema = z.instanceof(InMemoryCache)

export const ApolloClientSchema = z.instanceof(ApolloClient)

export const CreateHttpLinkSchema = z.instanceof(ApolloLink)