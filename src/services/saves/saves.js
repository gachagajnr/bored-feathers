// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  savesDataValidator,
  savesPatchValidator,
  savesQueryValidator,
  savesResolver,
  savesExternalResolver,
  savesDataResolver,
  savesPatchResolver,
  savesQueryResolver
} from './saves.schema.js'
import { SavesService, getOptions } from './saves.class.js'
import { savesPath, savesMethods } from './saves.shared.js'
import { preventSavingDuplicate } from '../../hooks/prevent-saving-duplicate.js'
import { populateActivitiesForSaves } from '../../hooks/populate-activities-for-saves.js'

export * from './saves.class.js'
export * from './saves.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const saves = (app) => {
  // Register our service on the Feathers application
  app.use(savesPath, new SavesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: savesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(savesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(savesExternalResolver),
        schemaHooks.resolveResult(savesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(savesQueryValidator), schemaHooks.resolveQuery(savesQueryResolver)],
      find: [],
      get: [],
      create: [
        preventSavingDuplicate,
        schemaHooks.validateData(savesDataValidator),
        schemaHooks.resolveData(savesDataResolver)
      ],
      patch: [schemaHooks.validateData(savesPatchValidator), schemaHooks.resolveData(savesPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      find: [
        // populateActivitiesForSaves
      ]
    },
    error: {
      all: []
    }
  })
}
