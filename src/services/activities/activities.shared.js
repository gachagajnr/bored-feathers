export const activitiesPath = 'activities'

export const activitiesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const activitiesClient = (client) => {
  const connection = client.get('connection')

  client.use(activitiesPath, connection.service(activitiesPath), {
    methods: activitiesMethods
  })
}
