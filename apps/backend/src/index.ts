import { logger } from './modules/winston/index.js';
import {app, httpServer, startServer} from './apollo-server.js'
import chalk from 'chalk'

import mongoConnect from './mongo-db.js'
import defaultRoute from './routes/DefaultRoute.js';

const init = async () => {
    await mongoConnect() 
    
    await startServer()

    await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve))

    //express routes

    app.use(defaultRoute)
    
    let serverUrl = 'http://localhost'

    const address = httpServer.address() as string | import('net').AddressInfo;

    // Verificar si address es del tipo AddressInfo y si tiene la propiedad 'port'
    if (typeof address !== 'string' && address.port) {
      serverUrl += `:${address.port}`;
    }
    

    logger.info(`🚀  Server ready at: ${chalk.greenBright(serverUrl)}`)
}

init()
