import { User } from '../models';
import { hashPassword } from '../utils/password'
import { generateObjectId } from '../utils/helper'

export const seedUser = async () => {
  const user = {
    _id: generateObjectId(),
    fullname: 'Kareem Daggash',
    email: 'kareemdag@gomoney.ca',
    password: hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  return seededUser
}
