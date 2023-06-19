// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  companiesDataValidator,
  companiesPatchValidator,
  companiesQueryValidator,
  companiesResolver,
  companiesExternalResolver,
  companiesDataResolver,
  companiesPatchResolver,
  companiesQueryResolver
} from './companies.schema.js'
import { CompaniesService, getOptions } from './companies.class.js'
import { companiesPath, companiesMethods } from './companies.shared.js'
import { attachCompanyIdToUserOwner } from '../../hooks/attach-company-id-to-user-owner.js'

export * from './companies.class.js'
export * from './companies.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const companies = (app) => {
  // Register our service on the Feathers application
  app.use(companiesPath, new CompaniesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: companiesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(companiesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(companiesExternalResolver),
        schemaHooks.resolveResult(companiesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(companiesQueryValidator),
        schemaHooks.resolveQuery(companiesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(companiesDataValidator),
        schemaHooks.resolveData(companiesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(companiesPatchValidator),
        schemaHooks.resolveData(companiesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [attachCompanyIdToUserOwner]
    },
    error: {
      all: []
    }
  })
}
