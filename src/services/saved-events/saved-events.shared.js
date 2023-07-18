export const savedEventsPath = 'saved-events'

export const savedEventsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const savedEventsClient = (client) => {
  const connection = client.get('connection')

  client.use(savedEventsPath, connection.service(savedEventsPath), {
    methods: savedEventsMethods
  })
}
