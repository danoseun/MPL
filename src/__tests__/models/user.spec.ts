import { User } from '../../models';
import { connect } from '../../config/db';
import { clearDatabase, closeDatabase } from '../../setupTest/config';

describe('User model tests', () => {
  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  const userData = {
    fullname: 'Oranu Chukwudi',
    email: 'xyluzchuks@gmail.com',
    password: 'dhfuh484ui3484o904',
    isAdmin: false,
  }

  it('Should save user data', async () => {
    const user = new User(userData)
    expect(() => user.save()).not.toThrow()
  })

  it('Should test that fullname field is required', async () => {
    const {fullname, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that email field is required', async () => {
    const {email, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that password field is required', async () => {
    const {password, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that password field has a minimum length of 7', async () => {
    const {password, ...otherValues} = userData
    try {
      const user = new User({
        password: '123456',
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that email field is validated', async () => {
    const {email, ...otherValues} = userData
    try {
      const user = new User({
        email: 'iowed.kds',
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should trim extra spaces on fullname', async () => {
    const {fullname, ...otherValues} = userData
    const user = new User({
      fullname: ' Oranu Chukwudi    ',
      ...otherValues,
    })
    expect(user.fullname).toBe('Oranu Chukwudi')
  })

  it('Should trim extra spaces on email', async () => {
    const {email, ...otherValues} = userData
    const user = new User({
      email: ' mintwithbank@gmail.com    ',
      ...otherValues,
    })
    expect(user.email).toBe('mintwithbank@gmail.com')
  })

  it('Should trim extra spaces on password', async () => {
    const {password, ...otherValues} = userData
    const user = new User({
      password: ' passmarcss    ',
      ...otherValues,
    })
    expect(user.password).toBe('passmarcss')
  })

  it('Should test that email field is lowercased', async () => {
    const {email, ...otherValues} = userData
    const user = new User({
      email: 'laracasts@gmail.com',
      ...otherValues,
    })
    expect(user.email).toBe('laracasts@gmail.com')
  })
})
