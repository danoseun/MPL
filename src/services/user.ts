import {generateObjectId, createToken} from '../utils/helper';
import { User } from '../models';
import { hashPassword, comparePassword } from '../utils/password';
import { CreateUserDto } from '../dto/user';

export class UserService {
    User:any
  constructor() {
    this.User = User
  }

  async createUser(user: { email: string; fullname: string; password: string; }) {
    try {
      const existingUser = await this.User.findOne({email: user.email})

      if (existingUser) {
        return null
      }

      const newUser = {fullname:user.fullname, email:user.email, password:user.password}
      newUser.password = hashPassword(user.password)

      const createdUser = new User(newUser)
      await createdUser.save()

      const {_id, fullname, email} = createdUser;

      const userToken = createToken(_id)

      const createdUserData = {
        _id,
        fullname,
        email,
      }
      return {createdUserData, userToken}
    } catch (error) {
      throw new Error(error)
    }
  }

  async loginUser(email: string, pass: string) {
    try {
      const user = await this.User.findOne({email})
      if (!user) {
        return null
      }
      const validPassword = comparePassword(pass, user.password)

      if (validPassword) {
        const token = createToken(user._id)
        return token
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(userId: any) {
    const userObjID = generateObjectId(userId)

    try {
      const gottenUser = await this.User.findOne({_id: userObjID})
      if (!gottenUser) {
        return null
      }

      const {fullname, email, role} = gottenUser

      const publicUser = {
        _id: gottenUser._id,
        fullname,
        email,
        role,
      }

      return publicUser
    } catch (error) {
      throw new Error(error)
    }
  }
}

//export default UserService
