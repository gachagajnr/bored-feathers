// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema.js'
import { UserService, getOptions } from './users.class.js'
import { userPath, userMethods } from './users.shared.js'

export * from './users.class.js'
export * from './users.schema.js'

import { addVerification, removeVerification } from 'feathers-authentication-management'
import notifier from '../auth-management/notifier.js'
import { disallow, iff, isProvider, preventChanges } from 'feathers-hooks-common'

const sendVerify = () => {
  return async (context) => {
    // const notifier = notifier(context.app)

    const users = Array.isArray(context.result) ? context.result : [context.result]

    await Promise.all(users.map(async (user) => notifier('resendVerifySignup', user)))
  }
}

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
        addVerification('auth-management')
      ],
      update: [disallow('external')],
      patch: [
        iff(
          isProvider('external'),
          preventChanges(
            true,
            'isVerified',
            'resetExpires',
            'resetShortToken',
            'resetToken',
            'verifyChanges',
            'verifyExpires',
            'verifyShortToken',
            'verifyToken'
          )
        ),
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [sendVerify(), removeVerification()]
    },
    error: {
      all: []
    }
  })
}
