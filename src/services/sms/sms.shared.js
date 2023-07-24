export const smsPath = 'sms'

export const smsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const smsClient = (client) => {
  const connection = client.get('connection')

  client.use(smsPath, connection.service(smsPath), {
    methods: smsMethods
  })
}
