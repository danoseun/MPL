import express from 'express';
import { errorResponse, messages, statusCodes, successResponseWithData } from '../utils';
import { validate } from '../utils/validate';

export class UserController {
  userService: any
  constructor(userService: any) {
    this.userService = userService
  }

  async createUser(req:express.Request, res:express.Response) {
    const errors = validate.validateUser(req)
    if (errors.length > 0) {
    //   return res.status(400).json({
    //     status: 400,
    //     errors,
    //   })
    return errorResponse(res, statusCodes.badRequest, errors)
    }

    const { fullname, email, password } = req.body

    const user = {
      fullname,
      email,
      password,
    }

    try {
      const userData = await this.userService.createUser(user)

      if (!userData) {
        return errorResponse(res, statusCodes.conflict, messages.conflict)
      }

      const { createdUserData, userToken } = userData
      return successResponseWithData(res, statusCodes.created, messages.created, userToken)
    //   return res.status(201).json({
    //     status: 201,
    //     data: createdUserData,
    //     message: 'Sign up was successfull',
    //     token: userToken,
    //   })
    } catch (error) {
        return errorResponse(res, statusCodes.unauthorized, error.message)
    }
  }

  async loginUser(req:express.Request, res:express.Response) {
    const errors = validate.verifyLogin(req)
    if (errors.length > 0) {
        return errorResponse(res, statusCodes.badRequest, errors)
    }

    const {email, password} = req.body

    try {
      const token = await this.userService.loginUser(email, password)

      if (!token) {
        return errorResponse(res, statusCodes.unauthorized, messages.unAuthorized)
      }
      return successResponseWithData(res, statusCodes.success, messages.success, token)
    } catch (error) {
        return errorResponse(res, statusCodes.serverError, error.message)
    }
  }
}
