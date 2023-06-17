export const savesPath = 'saves'

export const savesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const savesClient = (client) => {
  const connection = client.get('connection')

  client.use(savesPath, connection.service(savesPath), {
    methods: savesMethods
  })
}
