import { AuthManagementService, getOptions } from './auth-management.class.js'
import { authManagementPath, authManagementMethods } from './auth-management.shared.js'
import { AuthenticationManagementService } from 'feathers-authentication-management'
import notifier from './notifier.js'

export * from './auth-management.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const authManagement = (app) => {
  // Register our service on the Feathers application

  app.use(
    '/auth-management',
    new AuthenticationManagementService(app, {
      notifier: notifier(app),
      identifyUserProps: ['email']
    })
  )
  // app.configure(authManagement(notifier(app)))
  // Initialize hooks
  app.service(authManagementPath).hooks({
    around: {
      all: []
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
