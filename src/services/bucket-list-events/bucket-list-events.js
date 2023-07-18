// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  bucketListEventsDataValidator,
  bucketListEventsPatchValidator,
  bucketListEventsQueryValidator,
  bucketListEventsResolver,
  bucketListEventsExternalResolver,
  bucketListEventsDataResolver,
  bucketListEventsPatchResolver,
  bucketListEventsQueryResolver
} from './bucket-list-events.schema.js'
import { BucketListEventsService, getOptions } from './bucket-list-events.class.js'
import { bucketListEventsPath, bucketListEventsMethods } from './bucket-list-events.shared.js'
import { preventBucketEventDuplicate } from '../../hooks/prevent-bucket-event-duplicate.js'

export * from './bucket-list-events.class.js'
export * from './bucket-list-events.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const bucketListEvents = (app) => {
  // Register our service on the Feathers application
  app.use(bucketListEventsPath, new BucketListEventsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bucketListEventsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bucketListEventsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(bucketListEventsExternalResolver),
        schemaHooks.resolveResult(bucketListEventsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bucketListEventsQueryValidator),
        schemaHooks.resolveQuery(bucketListEventsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        preventBucketEventDuplicate,
        schemaHooks.validateData(bucketListEventsDataValidator),
        schemaHooks.resolveData(bucketListEventsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bucketListEventsPatchValidator),
        schemaHooks.resolveData(bucketListEventsPatchResolver)
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
