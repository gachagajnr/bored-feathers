export const bucketListPath = 'bucket-list'

export const bucketListMethods = ['find', 'get', 'create', 'patch', 'remove']

export const bucketListClient = (client) => {
  const connection = client.get('connection')

  client.use(bucketListPath, connection.service(bucketListPath), {
    methods: bucketListMethods
  })
}
