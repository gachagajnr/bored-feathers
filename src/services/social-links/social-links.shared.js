export const socialLinksPath = 'social-links'

export const socialLinksMethods = ['find', 'get', 'create', 'patch', 'remove']

export const socialLinksClient = (client) => {
  const connection = client.get('connection')

  client.use(socialLinksPath, connection.service(socialLinksPath), {
    methods: socialLinksMethods
  })
}
