import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { allRouter } from './routes';
import session from 'express-session'
import connectRedis from 'connect-redis'
import client, {rateLimiter} from './redis'
import { connect} from './config/db';
import { successResponse, errorResponse, statusCodes, messages } from './utils';


dotenv.config();

const app = express();
app.use(express.json());

const RedisStore = connectRedis(session)

app.use(
  session({
    store: new RedisStore({client}),
    secret: process.env.REDIS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

const port = process.env.PORT || 1734;

//morgan for logging
app.use(logger('dev'));



app.use(rateLimiter)
app.use(allRouter)



app.get('/api/v1', (req, res) => successResponse(res, statusCodes.success, messages.welcome));
app.get('*', (req, res) => errorResponse(res, statusCodes.notFound, messages.notFound));

connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

export default app;






