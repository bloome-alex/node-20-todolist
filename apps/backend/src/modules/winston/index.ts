import winston from 'winston'
import chalk from 'chalk'
import dayjs from 'dayjs'

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs.log'})
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            let coloredLevel

            switch(level){
                case 'info':
                    coloredLevel = chalk.cyanBright(level.toUpperCase())
                    break
                case 'warn':
                    coloredLevel = chalk.yellowBright(level.toUpperCase())
                    break
                case 'error':
                    coloredLevel = chalk.redBright(level.toUpperCase())
                    break
            }

            const formattedTimestamp = chalk.blueBright(dayjs(timestamp).format('YYYY-MM-DD hh:mm:ss'))
        
            return `${formattedTimestamp} - ${coloredLevel} - ${message}`
        })
    )
})