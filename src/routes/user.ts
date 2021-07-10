import { Router } from 'express'
import { UserController } from '../controllers/user'
import { UserService } from '../services/user';

const userService = new UserService()

const userController = new UserController(userService)

export const userRouter = Router()

// router.post('/signup', (req, res) => userController.createUser(req, res))
// router.post('/login', (req, res) => userController.loginUser(req, res))

userRouter.post('/signup', userController.createUser)
userRouter.post('/login', userController.loginUser)

