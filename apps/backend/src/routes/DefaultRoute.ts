import { Request, Response } from 'express'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'

const defaultRoute = express.Router();

defaultRoute.use('/', express.static('web', {index: 'index.html'}));

defaultRoute.use('*',function (_:Request, response:Response) {
    response.sendFile(path.resolve( 
        path.join(
            typeof __dirname === 'undefined' ? path.dirname(fileURLToPath(import.meta.url)) : __dirname, 
            '..', 
            'web/index.html') 
        )
    );
});

export default defaultRoute
