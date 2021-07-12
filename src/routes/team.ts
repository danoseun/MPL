import { Router } from 'express';
import { TeamController } from '../controllers/team';
import { TeamService } from '../services/team';
import { auth, adminAuth } from '../middlewares/auth'

const teamService = new TeamService()
const teamController = new TeamController(teamService)

export const teamRouter = Router()

teamRouter.post('/teams', auth, adminAuth, (req, res) =>
  teamController.createTeam(req, res)
)
teamRouter.patch('/teams/:id', auth, adminAuth, (req, res) =>
  teamController.updateTeam(req, res)
)
teamRouter.delete('/teams/:id', auth, adminAuth, (req, res) =>
  teamController.deleteTeam(req, res)
)
teamRouter.get('/teams/:id', auth, (req, res) => teamController.getTeam(req, res))
teamRouter.get('/teams', auth, (req, res) => teamController.getTeams(req, res))
teamRouter.get('/search/teams', (req, res) => teamController.searchTeam(req, res))

