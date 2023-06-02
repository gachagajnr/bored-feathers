import { activities } from './activities/activities.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(activities)

  app.configure(user)

  // All services will be registered here
}
