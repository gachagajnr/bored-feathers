// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  likesDataValidator,
  likesPatchValidator,
  likesQueryValidator,
  likesResolver,
  likesExternalResolver,
  likesDataResolver,
  likesPatchResolver,
  likesQueryResolver
} from './likes.schema.js'
import { LikesService, getOptions } from './likes.class.js'
import { likesPath, likesMethods } from './likes.shared.js'

export * from './likes.class.js'
export * from './likes.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const likes = (app) => {
  // Register our service on the Feathers application
  app.use(likesPath, new LikesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: likesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(likesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(likesExternalResolver),
        schemaHooks.resolveResult(likesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(likesQueryValidator), schemaHooks.resolveQuery(likesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(likesDataValidator), schemaHooks.resolveData(likesDataResolver)],
      patch: [schemaHooks.validateData(likesPatchValidator), schemaHooks.resolveData(likesPatchResolver)],
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
