import {generateObjectId} from '../utils/helper'
import { Team } from '../models'
import { CreateTeamDto } from '../dto/team';

export class TeamService {
    Team:any
  constructor() {
    this.Team = Team
  }

  async createTeam(team: { name: String; }) {
    try {
      const record = await this.Team.findOne({name: team.name})
      if (record) {
        return null
      }

      const createdTeam = await this.Team.create(team)

      return createdTeam
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTeam(teamId: any) {
    try {
      const teamIdObject = generateObjectId(teamId)

      const gottenTeam = await this.Team
        .findOne({_id: teamIdObject})
        .select('-__v')
        .exec()

      if (!gottenTeam) {
        return null
      }
      return gottenTeam
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTeams() {
    try {
      return await this.Team.find().select('-__v').sort('name').exec()
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateTeam(teamId: any, teamName: any) {
    try {
      const team = await this.Team.findOne({_id: generateObjectId(teamId)})

      if (!team) {
        return null
      }
      team.name = teamName

      await team.save()

      return team
    } catch (error) {
      if (error.message.includes('duplicate')) {
        return '409'
      }
      throw error
    }
  }

  async deleteTeam(teamId: any) {
    try {
      const teamIdObj = generateObjectId(teamId)

      const deleted = await this.Team.deleteOne({_id: teamIdObj})
      if (deleted.deletedCount === 0) {
        return null
      }
      return deleted
    } catch (error) {
      throw new Error(error)
    }
  }

  async checkTeams(homeId: any, awayId: any) {
    try {
      const ids = [generateObjectId(homeId), generateObjectId(awayId)]

      const records = await this.Team.find().where('_id').in(ids).exec()

      if (records.length !== 2) {
        return null
      }
      return records
    } catch (error) {
      throw new Error(error)
    }
  }

  async searchTeam(name: string) {
    try {
      const teams = await this.Team
        .find({
          name: {$regex: new RegExp(name, 'i')},
        })
        .select('-__v')
        .exec()
      return teams
    } catch (error) {
      throw new Error(error)
    }
  }
}
