import { Router } from 'express';
import { userRouter } from './user';
import { fixtureRouter } from './fixture';
import { teamRouter } from './team';

export const allRouter = Router()

allRouter.use('/auth', userRouter)
allRouter.use('/', fixtureRouter)
allRouter.use('/', teamRouter)


