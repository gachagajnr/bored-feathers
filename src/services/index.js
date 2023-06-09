import { socialLinks } from './social-links/social-links.js'

import { events } from './events/events.js'

import { mailer } from './mailer/mailer.js'

import { authManagement } from './auth-management/auth-management.js'

import { bucketList } from './bucket-list/bucket-list.js'

import { companies } from './companies/companies.js'

import { saves } from './saves/saves.js'

import { likes } from './likes/likes.js'

import { activities } from './activities/activities.js'

import { user } from './users/users.js'

// const authManagement = from './auth-management/auth-management.service.js'

export const services = (app) => {
  app.configure(socialLinks)

  app.configure(events)

  app.configure(mailer)

  app.configure(authManagement)

  app.configure(bucketList)

  app.configure(companies)

  app.configure(saves)

  app.configure(likes)

  app.configure(activities)

  app.configure(user)

  // app.configure(authManagement)

  // All services will be registered here
}
