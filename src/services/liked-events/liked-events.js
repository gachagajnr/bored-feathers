// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  likedEventsDataValidator,
  likedEventsPatchValidator,
  likedEventsQueryValidator,
  likedEventsResolver,
  likedEventsExternalResolver,
  likedEventsDataResolver,
  likedEventsPatchResolver,
  likedEventsQueryResolver
} from './liked-events.schema.js'
import { LikedEventsService, getOptions } from './liked-events.class.js'
import { likedEventsPath, likedEventsMethods } from './liked-events.shared.js'
import { preventLikingEventDuplicate } from '../../hooks/prevent-liking-event-duplicate.js'

export * from './liked-events.class.js'
export * from './liked-events.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const likedEvents = (app) => {
  // Register our service on the Feathers application
  app.use(likedEventsPath, new LikedEventsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: likedEventsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(likedEventsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(likedEventsExternalResolver),
        schemaHooks.resolveResult(likedEventsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(likedEventsQueryValidator),
        schemaHooks.resolveQuery(likedEventsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        preventLikingEventDuplicate,
        schemaHooks.validateData(likedEventsDataValidator),
        schemaHooks.resolveData(likedEventsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(likedEventsPatchValidator),
        schemaHooks.resolveData(likedEventsPatchResolver)
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
