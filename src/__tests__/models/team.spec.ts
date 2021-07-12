import {  Team } from '../../models/team'
import { connect } from '../../config/db';
import { clearDatabase, closeDatabase } from '../../setupTest/config';

describe('Team model tests', () => {
  beforeAll(async () => {
    await connect()
  })

  afterEach(async () => {
    await clearDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  const teamData = {
    name: 'Newcastle United',
  }

  it('Should save team data', async () => {
    const team = new Team(teamData)
    expect(() => team.save()).not.toThrow()
  })

  it('Should test that name is required', async () => {
    try {
      const team = new Team({})
      await team.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Team validation failed')
    }
  })

  it('Should trim extra spaces on name', async () => {
    const team = new Team({
      name: '   Rfaxln      ',
    })
    await team.save()
    expect(team.name).toBe('Rfaxln')
  })
})
