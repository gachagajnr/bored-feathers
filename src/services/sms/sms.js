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
import { smsPath, smsMethods } from './sms.shared.js'
import africastalking from 'africastalking'

export * from './sms.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const sms = (app) => {
  const AfricasTalking = africastalking({
    apiKey: process.env.AFRICASTALKINGKEY,
    username: process.env.AFRICASTALKINGUSERNAME
  })

  // Initialize our service with any options it requires
  app.use('/sms', {
    async create(data, params) {
      const options = {
        from: data.from,
        to: data.to,
        message: data.message
      }
      return await AfricasTalking.SMS.send(options)
    }
  })
  // Initialize hooks
  app.service(smsPath).hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
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
