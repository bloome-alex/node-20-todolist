import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import {resolvers, typeDefs} from './modules-merge.js'
import {ServerSchema} from './apollo-server.z.js'
import {z} from 'zod'

interface MyContext {
  token?: string
}

const app = express();

const httpServer = http.createServer(app);

const server : z.infer<typeof ServerSchema> = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer(){
    await server.start();
    app.use(
      '/graphql',
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
      }),
    );
}

export {
    app,
    server,
    httpServer,
    startServer
}