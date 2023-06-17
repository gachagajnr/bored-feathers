import { virtual, resolve } from '@feathersjs/schema'

export const populateActivities = async (context) => {
  const { result, user } = context
  // console.log(context.params.user.id)

  const savedActivityIds = await context.app
    .service('saves')
    .find({
      query: {
        userId: context.params.user.id, // Replace '_id' with the actual user ID field
        $select: ['activityId']
      }
    })
    .then((result) => result.data.map((like) => like.activityId))
  // console.log(savedActivityIds)
  const activities = await context.app.service('activities').find({
    query: {
      id: {
        $in: savedActivityIds
      }
    }
  })
  context.result = activities

  return context
}
