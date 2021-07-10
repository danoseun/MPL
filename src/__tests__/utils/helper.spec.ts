import {isValidEmail} from '../../utils/helper'

it('Should return true for valid email', () => {
  const isValid = isValidEmail('xyklue@gmail.com')
  expect(isValid).toBe(true)
})

it('Should return false for invalid email', () => {
  const isValid = isValidEmail('xykluel.com')
  expect(isValid).toBe(false)
})
