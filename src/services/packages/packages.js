// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  packagesDataValidator,
  packagesPatchValidator,
  packagesQueryValidator,
  packagesResolver,
  packagesExternalResolver,
  packagesDataResolver,
  packagesPatchResolver,
  packagesQueryResolver
} from './packages.schema.js'
import { PackagesService, getOptions } from './packages.class.js'
import { packagesPath, packagesMethods } from './packages.shared.js'

export * from './packages.class.js'
export * from './packages.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const packages = (app) => {
  // Register our service on the Feathers application
  app.use(packagesPath, new PackagesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: packagesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(packagesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(packagesExternalResolver),
        schemaHooks.resolveResult(packagesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(packagesQueryValidator),
        schemaHooks.resolveQuery(packagesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(packagesDataValidator),
        schemaHooks.resolveData(packagesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(packagesPatchValidator),
        schemaHooks.resolveData(packagesPatchResolver)
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
