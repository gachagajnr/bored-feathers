export const savedActivitiesPath = 'saved-activities'

export const savedActivitiesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const savedActivitiesClient = (client) => {
  const connection = client.get('connection')

  client.use(savedActivitiesPath, connection.service(savedActivitiesPath), {
    methods: savedActivitiesMethods
  })
}
