import { Router } from 'express'
import { userRouter } from './user'
// import fixtureRouter from './fixture'
// import teamRouter from './team'

export const router = Router()

router.use('/auth', userRouter)
// router.use('/', fixtureRouter)
// router.use('/', teamRouter)


