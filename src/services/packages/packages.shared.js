export const packagesPath = 'packages'

export const packagesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const packagesClient = (client) => {
  const connection = client.get('connection')

  client.use(packagesPath, connection.service(packagesPath), {
    methods: packagesMethods
  })
}
