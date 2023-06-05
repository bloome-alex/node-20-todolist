import { z } from 'zod'

import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { MongoConnectSchema, connectToMongoSchema } from './mongo-db.z.js'
import { logger } from './modules/winston/index.js'

const mongoConnect : z.infer<typeof MongoConnectSchema> = async function(){

    if(!process.env.MONGO_URI){
        throw new Error('process.env.MONGO_URI not found')
    }

    try{
        await connectToMongo(process.env.MONGO_URI)
        const db = mongoose.connection;

        db.on('error', function (){
            setTimeout(() => connectToMongo(process.env.MONGO_URI ? process.env.MONGO_URI : 'localhost:3006'), 3000)
        });

        db.once('open', function() {
            logger.info('Open DB')
        });

        const {ObjectId} = mongoose.Types;

        ObjectId.prototype.valueOf = function () {
            return this.toString();
        };
        
        return 'Mongoose connected'
    }
    catch (error){
        throw new Error('Connection to Mongo error: ' + error)
    }


}

const connectToMongo : z.infer<typeof connectToMongoSchema> = function (mongoUri:string){

    return new Promise((resolve, reject) => {

        mongoose.Promise = global.Promise;

        mongoose.connect(mongoUri)
            .then(() => {
                logger.info('mongodb connected')
                resolve('mongoose connected')
            })
            .catch(error => {
                reject(error)
            });

    })

}

export default mongoConnect
