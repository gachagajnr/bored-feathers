import { MailerService, getOptions } from './mailer.class.js'
import { mailerPath, mailerMethods } from './mailer.shared.js'
import aMailer from 'feathers-mailer'
import nodemailer  from'nodemailer'

export * from './mailer.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const mailer = async(app) => {
  const account = await nodemailer.createTestAccount() // internet required

  // Register our service on the Feathers application
  // app.use(mailerPath, new MailerService(getOptions(app)), {
  //   // A list of all methods this service exposes externally
  //   methods: mailerMethods,
  //   // You can add additional custom events to be sent to clients here
  //   events: []
  // })
  const transporter = {
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure, // 487 only
    requireTLS: true,
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  }

  app.use('mailer', aMailer(transporter, { from: account.user }))



  await app.service('mailer')
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
