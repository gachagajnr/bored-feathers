export const likesPath = 'likes'

export const likesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const likesClient = (client) => {
  const connection = client.get('connection')

  client.use(likesPath, connection.service(likesPath), {
    methods: likesMethods
  })
}
