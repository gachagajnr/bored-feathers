import { virtual, resolve } from '@feathersjs/schema'

export const populateActivitiesForSaves = async (context) => {
  const { result, user } = context
  const rrr = await context.app
    .service('saved')
    .find({
      query: {
        activityId: {
          $in: result.data.map((activity) => activity.id)
        }
      }
    })
    .then((saves) => {
      result.data.forEach((save) => {
        save.likedActivities = saves.data.filter(
          (sa) => sa.activityId === save.id && sa.userId === context.params.user.id
        )
      })
    })



    // const rrr = await context.app
    //   .service('activities')
    //   .find({
    //     query: {
    //       id: {
    //         $in: result.data.map((activity) => activity.activityId)
    //       }
    //     }
    //   })
    //   .then((saves) => {
    //     result.data.forEach((save) => {
    //       save.likedActivities = saves.data.filter(
    //         (sa) => sa.activityId === save.id && sa.userId === context.params.user.id
    //       )
    //     })
    //   })


















  return context
}
