// @ts-nocheck

import {generateObjectId} from '../../utils/helper';
import { UserService } from '../../services/user';
import { hashPassword, comparePassword } from '../../utils/password'
import { seedUser } from '../../setupTest/seeder'
import { connect } from '../../config/db';
import {clearDatabase, closeDatabase} from '../../setupTest/config'
import { CreateUserDto } from '../../dto/user';

let seededUser: CreateUserDto



beforeAll(async () => {
  await connect()
})
beforeEach(async () => {
  seededUser = await seedUser()
})

afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await closeDatabase()
})

describe('UserService', () => {
  describe('createUser', () => {
    it('should not create a new user if record already exists', async () => {
      const user = {
        fullname: 'Arewa Olakunle',
        email: seededUser.email,
        password: 'marcpasspassa',
      }
      const userService = new UserService()

      const nullRecord = await userService.createUser(user)
      expect(nullRecord).toBe(null)
    })

    it('should create a new user', async () => {
      const userNew = {
        fullname: 'Jack Ryan',
        email: 'jackiery@example.com',
        password: 'yupMyPassword',
      }

    //   const hashPass = jest
    //     .spyOn(password, 'hashPassword')
    //     .mockReturnValue('ksjndfklsndflksdmlfksdf')

      const userService = new UserService()
      const user = await userService.createUser(userNew)

      //expect(hashPass).toHaveBeenCalled()
      expect(user.createdUserData._id).toBeDefined()
      expect(user.createdUserData.fullname).toBe(userNew.fullname)
      expect(user.createdUserData.role).toBe(userNew.role)
    })
  })

  describe('getUser', () => {
    it('should not get an user if record does not exists', async () => {
      try {
        const userObjID = generateObjectId('3457qwe568ujAQ233789')

        const userService = new UserService()

        await userService.getUser(userObjID)
      } catch (error) {
        //expect(error.message).toMatch('no record found')
        expect(error.message).toMatch('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
      }
    })
  })
})
