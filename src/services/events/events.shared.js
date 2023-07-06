export const eventsPath = 'events'

export const eventsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const eventsClient = (client) => {
  const connection = client.get('connection')

  client.use(eventsPath, connection.service(eventsPath), {
    methods: eventsMethods
  })
}
