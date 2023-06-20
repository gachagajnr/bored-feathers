import { MailerService, getOptions } from './mailer.class.js'
import { mailerPath, mailerMethods } from './mailer.shared.js'

export * from './mailer.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const mailer = (app) => {
  // Register our service on the Feathers application
  app.use(mailerPath, new MailerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mailerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mailerPath).hooks({
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
