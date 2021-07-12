import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/server';

beforeAll((done) => {
  done()
})

afterAll((done) => {
  // Close the DB connection.
  mongoose.connection.close()
  done()
})

it('Should return welcome', async () => {
  const response = await request(app).get('/api/v1').send().expect(200)
  expect(response.body.message).toEqual('welcome on board')
})
