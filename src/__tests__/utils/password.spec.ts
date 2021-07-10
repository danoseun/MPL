import bcrypt from 'bcrypt'
import { hashPassword, comparePassword } from '../../utils/password';

describe('Password', () => {
  describe('hashPassword', () => {
    it('should hash a password', () => {
      const salt = jest
        .spyOn(bcrypt, 'genSaltSync')
        .mockReturnValue('dkhfksdjf')
      const hash = jest
        .spyOn(bcrypt, 'hashSync')
        .mockReturnValue('sjdfkjshdfkjsdfjskjdfsdfsdfsdf')

      const hashed = hashPassword('password')

      expect(salt).toHaveBeenCalledTimes(1)
      expect(hash).toHaveBeenCalledTimes(1)
      expect(hashed).toBe('sjdfkjshdfkjsdfjskjdfsdfsdfsdf')
      expect(hashed.length).toBeGreaterThan(0)
    })
  })

  describe('validPassword', () => {
    it('should verify a password with hash', () => {
      const pass = 'password'
      const hashed = 'skjndfjksndfjnsdjkfnskjdnfjsndf'

      // stubbing the verification
      const verify = jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true)

      const correct = comparePassword(pass, hashed)

      expect(verify).toHaveBeenCalledTimes(1)
      expect(correct).toBeTruthy()
    })
  })
})
