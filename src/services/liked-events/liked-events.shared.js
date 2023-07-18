export const likedEventsPath = 'liked-events'

export const likedEventsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const likedEventsClient = (client) => {
  const connection = client.get('connection')

  client.use(likedEventsPath, connection.service(likedEventsPath), {
    methods: likedEventsMethods
  })
}
