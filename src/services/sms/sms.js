// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  smsDataValidator,
  smsPatchValidator,
  smsQueryValidator,
  smsResolver,
  smsExternalResolver,
  smsDataResolver,
  smsPatchResolver,
  smsQueryResolver
} from './sms.schema.js'
import { SmsService, getOptions } from './sms.class.js'
import { smsPath, smsMethods } from './sms.shared.js'

export * from './sms.class.js'
export * from './sms.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const sms = (app) => {
  // Register our service on the Feathers application
  app.use(smsPath, new SmsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: smsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(smsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(smsExternalResolver),
        schemaHooks.resolveResult(smsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(smsQueryValidator), schemaHooks.resolveQuery(smsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(smsDataValidator), schemaHooks.resolveData(smsDataResolver)],
      patch: [schemaHooks.validateData(smsPatchValidator), schemaHooks.resolveData(smsPatchResolver)],
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
