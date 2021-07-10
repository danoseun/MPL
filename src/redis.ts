import redis from 'redis'
import moment from 'moment'
import dotenv from 'dotenv'
import express from 'express'
import { errorResponse, messages, statusCodes } from './utils'

dotenv.config()

const {MAX_RATE, MIN_CALL_RATE_IN_MINUTES} = process.env

const client = redis.createClient(process.env.REDIS_URL)


export interface IUserRequest extends express.Request {
    sessionID: any
}


client.on('connect', () => {
  console.log('Redis client connected')
})

client.on('error', (err: any) => {
  console.log(`Something went wrong ${err}`)
})



export const rateLimiter = async (req:IUserRequest, res:express.Response, next:express.NextFunction) => {
  const id = `rate:${req.sessionID}`
  client.exists(id, (err: any, exist: any) => {
    if (err) {
      console.log('Redis not working...')
    }
    if (exist === 1) {
      client.get(id, (_err: any, reply: any) => {
        const data = JSON.parse(reply)
        const currentTime = moment().unix()
        const difference = (currentTime - data.startTime) / 60

        if (difference >= Number(MIN_CALL_RATE_IN_MINUTES)) {
          const body = {
            count: 1,
            startTime: moment().unix(),
          }
          client.set(id, JSON.stringify(body))
          return next()
        }
        if (difference < Number(MIN_CALL_RATE_IN_MINUTES)) {
          if (data.count >= Number(MAX_RATE)) {
            return errorResponse(res, statusCodes.tooManyRequests, messages.limitExceeded);
          }

          // update cache if api call is less than min and max rate
          data.count += 1
          client.set(id, JSON.stringify(data))
          return next()
        }
      })
    } else {
      const body = {
        count: 1,
        startTime: moment().unix(),
      }
      client.set(id, JSON.stringify(body))
      return next()
    }
  })
}

export default client
