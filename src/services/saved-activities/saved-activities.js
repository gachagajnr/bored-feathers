// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  savedActivitiesDataValidator,
  savedActivitiesPatchValidator,
  savedActivitiesQueryValidator,
  savedActivitiesResolver,
  savedActivitiesExternalResolver,
  savedActivitiesDataResolver,
  savedActivitiesPatchResolver,
  savedActivitiesQueryResolver
} from './saved-activities.schema.js'
import { SavedActivitiesService, getOptions } from './saved-activities.class.js'
import { savedActivitiesPath, savedActivitiesMethods } from './saved-activities.shared.js'

export * from './saved-activities.class.js'
export * from './saved-activities.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const savedActivities = (app) => {
  // Register our service on the Feathers application
  app.use(savedActivitiesPath, new SavedActivitiesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: savedActivitiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(savedActivitiesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(savedActivitiesExternalResolver),
        schemaHooks.resolveResult(savedActivitiesResolver)
      ]
    },
    before: {
      all: [
        // populateActivities,
        schemaHooks.validateQuery(savedActivitiesQueryValidator),
        schemaHooks.resolveQuery(savedActivitiesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(savedActivitiesDataValidator),
        schemaHooks.resolveData(savedActivitiesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(savedActivitiesPatchValidator),
        schemaHooks.resolveData(savedActivitiesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      find: []
    },
    error: {
      all: []
    }
  })
}
