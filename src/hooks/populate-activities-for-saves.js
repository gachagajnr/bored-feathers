import { virtual, resolve } from '@feathersjs/schema'

export const populateActivitiesForSaves = async (context) => {
  console.log(context.result.data)
  // console.log(`Running hook populate-activities-for-saves on ${context.path}.${context.method}`)

  const messageResolver = resolve({
    likes: async (value, message, context) => {
      return context.app.service('activities').get(message.activityId)
    }
  })

  // const resolvedMessage = await messageResolver.resolve(context.res)
}
