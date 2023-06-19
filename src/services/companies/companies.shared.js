export const companiesPath = 'companies'

export const companiesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const companiesClient = (client) => {
  const connection = client.get('connection')

  client.use(companiesPath, connection.service(companiesPath), {
    methods: companiesMethods
  })
}
