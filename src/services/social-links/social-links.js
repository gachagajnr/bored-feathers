// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  socialLinksDataValidator,
  socialLinksPatchValidator,
  socialLinksQueryValidator,
  socialLinksResolver,
  socialLinksExternalResolver,
  socialLinksDataResolver,
  socialLinksPatchResolver,
  socialLinksQueryResolver
} from './social-links.schema.js'
import { SocialLinksService, getOptions } from './social-links.class.js'
import { socialLinksPath, socialLinksMethods } from './social-links.shared.js'

export * from './social-links.class.js'
export * from './social-links.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const socialLinks = (app) => {
  // Register our service on the Feathers application
  app.use(socialLinksPath, new SocialLinksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: socialLinksMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(socialLinksPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(socialLinksExternalResolver),
        schemaHooks.resolveResult(socialLinksResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(socialLinksQueryValidator),
        schemaHooks.resolveQuery(socialLinksQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(socialLinksDataValidator),
        schemaHooks.resolveData(socialLinksDataResolver)
      ],
      patch: [
        schemaHooks.validateData(socialLinksPatchValidator),
        schemaHooks.resolveData(socialLinksPatchResolver)
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
