// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  activitiesDataValidator,
  activitiesPatchValidator,
  activitiesQueryValidator,
  activitiesResolver,
  activitiesExternalResolver,
  activitiesDataResolver,
  activitiesPatchResolver,
  activitiesQueryResolver
} from './activities.schema.js'
import { ActivitiesService, getOptions } from './activities.class.js'
import { activitiesPath, activitiesMethods } from './activities.shared.js'
import { showSaved } from '../../hooks/show-saved.js'

export * from './activities.class.js'
export * from './activities.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const activities = (app) => {
  // Register our service on the Feathers application
  app.use(activitiesPath, new ActivitiesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: activitiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(activitiesPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        schemaHooks.resolveExternal(activitiesExternalResolver),
        schemaHooks.resolveResult(activitiesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(activitiesQueryValidator),
        schemaHooks.resolveQuery(activitiesQueryResolver)
      ],
      find: [],
      get: [authenticate('jwt')],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(activitiesDataValidator),
        schemaHooks.resolveData(activitiesDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(activitiesPatchValidator),
        schemaHooks.resolveData(activitiesPatchResolver)
      ],
      remove: [authenticate('jwt')]
    },
    after: {
      all: [],
      find: [showSaved],
      get: [showSaved]
    },
    error: {
      all: []
    }
  })
}
