import express from 'express';
import {isValidEmail, isValidName, isValidObjectId} from './helper';

export const validate = {
  validateUser(req:express.Request) {
    const {email, fullname, password} = req.body
    const errors = []

    if (!isValidEmail(email) || !email) {
      errors.push({emailError: 'Please enter a valid email address'})
    }
    if (!isValidName(fullname) || !fullname) {
      errors.push({
        fullNameError: 'Please enter a valid fullname i.e Money Gow ',
      })
    }
    if (!password) {
      errors.push({passwordError: 'Please enter a valid password'})
    }
    if (password && password.length < 6) {
      errors.push({
        passwordError: 'Please enter a password of at least six characters',
      })
    }

    return errors
  },

  verifyLogin(req:express.Request) {
    const {email, password} = req.body

    const errors = []

    if (!email || !isValidEmail(email)) {
      errors.push({email: 'Email or password is incorrect'})
    }
    if (!password || password.length < 6) {
      errors.push({
        password: 'Email or password is incorrect',
      })
    }
    return errors
  },

  fixtureValidate(req:express.Request) {
    const {homeTeam, awayTeam, matchDate} = req.body
    const errors = []

    if (!homeTeam || !isValidObjectId(homeTeam)) {
      errors.push({homeTeamError: 'homeTeam field is invalid'})
    }
    if (!awayTeam || !isValidObjectId(awayTeam)) {
      errors.push({awayTeamError: 'awayTeam field is invalid'})
    }

    if (!matchDate) {
      errors.push({matchDateError: 'matchDate field is invalid'})
    } else {
      const validDay = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/
      if (!validDay.test(matchDate)) {
        errors.push({
          matchDateError: `matchDate field format should be yyyy-mm-dd`,
        })
      }
      const currentDate = new Date()
      const matchDateTest = `${matchDate.split('-')[2]}-${
        matchDate.split('-')[1]
      }-${matchDate.split('-')[0]}`
      const currentMatchDate = new Date(matchDateTest)
      if (currentMatchDate !== currentDate && currentMatchDate < currentDate) {
        errors.push({matchDateError: `Fixture date must be in the future`})
      }
    }

    if (homeTeam && awayTeam && homeTeam === awayTeam) {
      errors.push({duplicateTeamError: 'Fixture must be with different teams'})
    }

    const updates = Object.keys(req.body)
    const allowedUpdates = [
      'matchDate',
      'homeTeam',
      'awayTeam',
      'homeTeamScore',
      'awayTeamScore',
      'pendingMatch',
    ]
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!isValidOperation) {
      errors.push({validFieldsError: 'Invalid updates found!'})
    }

    return errors
  },

  teamValidate(req:express.Request) {
    const {name} = req.body

    const errors = []

    if (!name || typeof name !== 'string') {
      errors.push({nameError: 'a valid team name is required'})
    }
    return errors
  },

  searchValidate(req:express.Request) {
    const {query} = req.query

    const errors = []

    if (!query) {
      errors.push({queryError: 'query is required'})
    }
    return errors
  },
}
