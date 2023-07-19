// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  eventsDataValidator,
  eventsPatchValidator,
  eventsQueryValidator,
  eventsResolver,
  eventsExternalResolver,
  eventsDataResolver,
  eventsPatchResolver,
  eventsQueryResolver
} from './events.schema.js'
import { EventsService, getOptions } from './events.class.js'
import { eventsPath, eventsMethods } from './events.shared.js'
import { showSavedEvents } from '../../hooks/show-saved-events.js'

export * from './events.class.js'
export * from './events.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const events = (app) => {
  // Register our service on the Feathers application
  app.use(eventsPath, new EventsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: eventsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(eventsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(eventsExternalResolver),
        schemaHooks.resolveResult(eventsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(eventsQueryValidator), schemaHooks.resolveQuery(eventsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(eventsDataValidator), schemaHooks.resolveData(eventsDataResolver)],
      patch: [schemaHooks.validateData(eventsPatchValidator), schemaHooks.resolveData(eventsPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      find: [showSavedEvents],
      get: [showSavedEvents]
    },
    error: {
      all: []
    }
  })
}
