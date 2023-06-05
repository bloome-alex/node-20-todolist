import { z } from 'zod'

import apolloClient from '../../../apollo'
import booksQuery from './gqlc/books.graphql'
import { gql } from 'graphql-tag'

import { ApolloClientSchema } from '../../../apollo/index.z'

import { BaseProviderInterface } from './baseProviders.z'

class BaseProvider implements BaseProviderInterface{
    gqlc: z.infer<typeof ApolloClientSchema>;

    constructor(apolloClient: z.infer<typeof ApolloClientSchema>) {
        this.gqlc = apolloClient
    }

    books(){
        return this.gqlc.query({
            query: gql`${booksQuery}`
        })
    }
}

const BaseProviderSchema = z.instanceof(BaseProvider)

const baseProvider : z.infer<typeof BaseProviderSchema> = new BaseProvider(apolloClient)

export default baseProvider

