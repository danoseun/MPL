import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const {ObjectId} = mongoose.Types

export const isValidEmail = (email: string) => {
  return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(
    email
  )
}

export const isValidName = (name: string) => {
  return /[a-zA-Z]+\s+[a-zA-Z]+/.test(name)
}

// export const generateToken = (id: any) => {
//   const token = jwt.sign({_id: id.toString()}, process.env.JWT_SECRET, {
//     expiresIn: '2d',
//   })
//   return token
// }
export const createToken = (id:string) => {
    const token = jwt.sign({ _id: id.toString() }, process.env.SECRETKEY);
    return token;
};

export const isValidObjectId = (id: string) => {
  const isValidId = ObjectId.isValid(id)
  if (isValidId) {
    return String(new ObjectId(id)) === id
  }
  return false
}

export const generateObjectId = (id?: any) => {
  const newId = id ? new ObjectId(id) : new ObjectId()
  return newId
}

export default {isValidEmail, isValidObjectId, generateObjectId, isValidName}
