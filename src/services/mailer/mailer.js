import { MailerService, getOptions } from './mailer.class.js'
import { mailerPath, mailerMethods } from './mailer.shared.js'
import aMailer from 'feathers-mailer'
import { disallow } from 'feathers-hooks-common'

import nodemailer from 'nodemailer'

import mandrillTransport from 'nodemailer-mandrill-transport'

export * from './mailer.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const mailer = async (app) => {
  app.use(
    'mailer',
    aMailer(
      mandrillTransport({
        auth: {
          apiKey: 'md-dj7JJF_bRAxKZKDbGDoVnQ'
        }
      })
    )
  )

  await app.service('mailer')
  // Initialize hooks
  app.service(mailerPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [disallow('external')],
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
