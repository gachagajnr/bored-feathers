export const bucketListEventsPath = 'bucket-list-events'

export const bucketListEventsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const bucketListEventsClient = (client) => {
  const connection = client.get('connection')

  client.use(bucketListEventsPath, connection.service(bucketListEventsPath), {
    methods: bucketListEventsMethods
  })
}
