// functions for success and error responses
import express from 'express';

const successResponse = (res:express.Response, statusCode:number, message:string) => res
  .status(statusCode).send({
    statusCode,
    message,
  });

const successResponseWithData = (res:express.Response, statusCode:number, message:string, data:any) => res
  .status(statusCode).send({
    statusCode,
    data,
    message,
  });

const errorResponse = (res:express.Response, statusCode:number, error:Object) => res
  .status(statusCode).send({
    statusCode,
    error,
  });

export { successResponse, successResponseWithData, errorResponse };