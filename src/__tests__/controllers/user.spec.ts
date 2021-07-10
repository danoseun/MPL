// @ts-nocheck

import { validate } from '../../utils/validate'
import { UserController } from '../../controllers/user'
import { UserService } from '../../services/user'

describe('UserController', () => {
  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
  }

  let res: { status?: any; json?: any }
  let userController: UserController
  let userService: UserService

  beforeEach(() => {
    res = mockResponse()
    userService = new UserService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const req = {
        body: {
          fullname: 'Raymond Tukpe',
          email: 'raymond@spring.com',
          password: 'mypassaPasSa',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockReturnValue(req.body)

      userController = new UserController(userService)

      await userController.createUser(req, res)

      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(201)
    })

    it('Should catch error from try catch', async () => {
      const req = {
        body: {
          fullname: 'Thomas Leblanc',
          email: 'leblanct@gmail.com',
          password: 'mYPassMyPass',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          throw new Error('Error')
        })

      userController = new UserController(userService)

      await userController.createUser(req, res)
      expect(errorStub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 401,
        error: 'Error',
      })
    })

    it('Should not register if Email has already been registered', async () => {
      const req = {
        body: {
          fullname: 'Bankly Smith',
          email: 'smithbankly@gmail.com',
          password: 'MarraShelAKA',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          return null
        })

      userController = new UserController(userService)

      await userController.createUser(req, res)

      expect(errorStub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(409)
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 409,
        error: 'resource already exists!',
      })
    })
  })

  describe('loginUser', () => {
    it('should return errors array when validation fails', async () => {
      const req = {
        body: {email: 'endsars.com', password: 'secretpassapassa23'},
      }

      const errors = [{email: 'a valid email is required'}]

      const errorStub = jest
        .spyOn(validate, 'verifyLogin')
        .mockReturnValue(errors)

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(400)
      //expect(res.send).toHaveBeenCalledWith({statusCode: 400, errors})
    })

    it('should not login a user due to error', async () => {
      const req = {
        body: {email: 'wildfriex@gmail.com', password: 'bAraKAPass'},
      }

      const errorStub = jest.spyOn(validate, 'verifyLogin').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'loginUser')
        .mockImplementation(() => {
          return null
        })

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(stub).toHaveBeenCalledTimes(1)
      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 401,
        error: 'Email or password is incorrect',
      })
    })

    it('should login a user successfully', async () => {
      const req = {
        body: {email: 'sethgodin@gmail.com', password: 'seth1234GoDin'},
      }

      const stubValue = {
        token: 'faketokenvalue',
      }

      const errorStub = jest.spyOn(validate, 'verifyLogin').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'loginUser')
        .mockReturnValue(stubValue)

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(stub).toHaveBeenCalledTimes(1)
      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.send).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 200,
        data: stubValue,
        message: 'request was successful',
      })
    })
  })
})
