import { User } from '../../src/models/user';
import { Team } from '../../src/models/team'
import { hashPassword } from '../../src/utils/password';
import { generateObjectId, createToken } from '../../src/utils/helper';

export async function seedFixtureAdmin() {
  const admin = {
    _id: generateObjectId(),
    fullName: 'Sega Link',
    email: 'linkedsegae@example.com',
    password: hashPassword('password'),
    role: 'admin',
  }
  const seededAdmin = await User.create(admin)

  const token = createToken(seededAdmin._id)

  return {seededAdmin, token}
}

export async function seedFixtureUser() {
  const user = {
    _id: generateObjectId(),
    fullName: 'Sergey Brin',
    email: 'brinsergey@example.com',
    password: hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  const token = createToken(seededUser._id)

  return {seededUser, token}
}

export async function seedTeamAdmin() {
  const admin = {
    _id: generateObjectId(),
    fullName: 'Abrahm Admin',
    email: 'arahnfisger@example.com',
    password: hashPassword('password'),
    role: 'admin',
  }
  const seededAdmin = await User.create(admin)

  const token = createToken(seededAdmin._id)

  return {seededAdmin, token}
}

export async function seedTeamUser() {
  const user = {
    _id: generateObjectId(),
    fullName: 'Teamer User',
    email: 'teameruser@example.com',
    password: hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  const token = createToken(seededUser._id)

  return {seededUser, token}
}

export async function seedTeams() {
  const teams = [
    {
      name: 'FC Toulouse',
    },
    {
      name: 'FC Deepak',
    },
  ]
  const seededTeams = await Team.insertMany(teams)
  return seededTeams
}
