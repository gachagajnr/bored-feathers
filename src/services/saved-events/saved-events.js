// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  savedEventsDataValidator,
  savedEventsPatchValidator,
  savedEventsQueryValidator,
  savedEventsResolver,
  savedEventsExternalResolver,
  savedEventsDataResolver,
  savedEventsPatchResolver,
  savedEventsQueryResolver
} from './saved-events.schema.js'
import { SavedEventsService, getOptions } from './saved-events.class.js'
import { savedEventsPath, savedEventsMethods } from './saved-events.shared.js'
import { preventSavingEventDuplicate } from '../../hooks/prevent-saving-event-duplicate.js'

export * from './saved-events.class.js'
export * from './saved-events.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const savedEvents = (app) => {
  // Register our service on the Feathers application
  app.use(savedEventsPath, new SavedEventsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: savedEventsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(savedEventsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(savedEventsExternalResolver),
        schemaHooks.resolveResult(savedEventsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(savedEventsQueryValidator),
        schemaHooks.resolveQuery(savedEventsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        preventSavingEventDuplicate,
        schemaHooks.validateData(savedEventsDataValidator),
        schemaHooks.resolveData(savedEventsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(savedEventsPatchValidator),
        schemaHooks.resolveData(savedEventsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
