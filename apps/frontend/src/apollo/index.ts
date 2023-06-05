import { z } from 'zod'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import { InMemoryCacheSchema, ApolloClientSchema, CreateHttpLinkSchema } from './index.z'

// HTTP connection to the API
const httpLink : z.infer<typeof CreateHttpLinkSchema> = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_API_URL + '/graphql',
})

const cache : z.infer<typeof InMemoryCacheSchema> = new InMemoryCache()

const apolloClient : z.infer<typeof ApolloClientSchema> = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient