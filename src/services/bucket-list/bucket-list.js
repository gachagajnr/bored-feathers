// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  bucketListDataValidator,
  bucketListPatchValidator,
  bucketListQueryValidator,
  bucketListResolver,
  bucketListExternalResolver,
  bucketListDataResolver,
  bucketListPatchResolver,
  bucketListQueryResolver
} from './bucket-list.schema.js'
import { BucketListService, getOptions } from './bucket-list.class.js'
import { bucketListPath, bucketListMethods } from './bucket-list.shared.js'
import { preventBucketDuplicate } from '../../hooks/prevent-bucket-duplicate.js'

export * from './bucket-list.class.js'
export * from './bucket-list.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const bucketList = (app) => {
  // Register our service on the Feathers application
  app.use(bucketListPath, new BucketListService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bucketListMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bucketListPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(bucketListExternalResolver),
        schemaHooks.resolveResult(bucketListResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bucketListQueryValidator),
        schemaHooks.resolveQuery(bucketListQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        preventBucketDuplicate,

        schemaHooks.validateData(bucketListDataValidator),
        schemaHooks.resolveData(bucketListDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bucketListPatchValidator),
        schemaHooks.resolveData(bucketListPatchResolver)
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
