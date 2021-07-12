import { Router } from 'express'
import { FixtureController } from '../controllers/fixture';
import { FixtureService } from '../services/fixture';
import { TeamService } from '../services/team';
import {auth, adminAuth} from '../middlewares/auth'

const fixtureService = new FixtureService()
const teamService = new TeamService()
const fixtureController = new FixtureController(fixtureService, teamService)

export const fixtureRouter = Router()

fixtureRouter.post('/fixtures', auth, adminAuth, (req, res) =>
  fixtureController.createFixture(req, res)
)
fixtureRouter.get('/fixtures', auth, (req, res) =>
  fixtureController.getFixtures(req, res)
)
fixtureRouter.get('/fixtures/:id', auth, (req, res) =>
  fixtureController.getSpecificFixture(req, res)
)
fixtureRouter.get('/search/fixtures', (req, res) =>
  fixtureController.searchFixture(req, res)
)
fixtureRouter.patch('/fixtures/:id', auth, adminAuth, (req, res) =>
  fixtureController.updateFixture(req, res)
)
fixtureRouter.delete('/fixtures/:id', auth, adminAuth, (req, res) =>
  fixtureController.deleteFixture(req, res)
)
