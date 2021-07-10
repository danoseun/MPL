// @ts-nocheck

import express from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserService } from '../services/user';
import { successResponse, errorResponse, statusCodes, messages } from '../utils';


dotenv.config()

export const auth = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
        return errorResponse(res, statusCodes.forbidden, messages.noToken)
    }

    try {
      const userService = new UserService()
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await userService.getUser(decoded._id)
      if (!user) {
        return errorResponse(res, statusCodes.unauthorized, messages.userNotFound)
      }
      req.session.user = user
      next()
    } catch (error) {
        return errorResponse(res, statusCodes.unauthorized, messages.incorrectToken)
    }
  } catch (e) {
    return errorResponse(res, statusCodes.unauthorized, messages.authenticate)
  }
}

export const adminAuth = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const {user} = req.session
  if (user && user.role !== 'admin') {
    return errorResponse(res, statusCodes.unauthorized, messages.notAllowed);
  }
  next()
}
