import { companies } from './companies/companies.js'

import { savedActivities } from './saved-activities/saved-activities.js'

import { saves } from './saves/saves.js'

import { likes } from './likes/likes.js'

import { activities } from './activities/activities.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(companies)

  app.configure(savedActivities)

  app.configure(saves)

  app.configure(likes)

  app.configure(activities)

  app.configure(user)

  // All services will be registered here
}
