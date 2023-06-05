import { z } from 'zod'

import { ApolloClientSchema } from "../../../apollo/index.z";

import { ApolloQueryResult } from '@apollo/client';

export interface GqlcInterface {
    query: (params: string) => Promise<any>;
}

export interface BaseProviderInterface {
    gqlc: z.infer<typeof ApolloClientSchema>;
    books(): Promise<ApolloQueryResult<any>>;
}