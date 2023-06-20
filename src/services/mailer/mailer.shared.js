export const mailerPath = 'mailer'

export const mailerMethods = ['find', 'get', 'create', 'patch', 'remove']

export const mailerClient = (client) => {
  const connection = client.get('connection')

  client.use(mailerPath, connection.service(mailerPath), {
    methods: mailerMethods
  })
}
