// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { activitiesSchema } from '../activities/activities.schema.js'
import { userSchema } from '../users/users.schema.js'
// Main data model schema
export const savesSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number(),
    // activity: Type.Ref(activitiesSchema)
  },
  { $id: 'Saves', additionalProperties: false }
)
export const savesValidator = getValidator(savesSchema, dataValidator)
export const savesResolver = resolve({
  // user: virtual(async (saves, context) => {
  //   // Associate the company that created the activity
  //   return context.app.service('users').get(saves.userId, {
  //     $select: ['email']
  //   })
  // })
  // activity: virtual(async (saves, context) => {
  //   // Associate the company that created the activity
  //   return context.app.service('activities').get(saves.activityId)
  // })
})

export const savesExternalResolver = resolve({})

// Schema for creating new entries
export const savesDataSchema = Type.Pick(savesSchema, ['activityId'], {
  $id: 'SavesData'
})
export const savesDataValidator = getValidator(savesDataSchema, dataValidator)
export const savesDataResolver = resolve({
  userId: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
    // return 1
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const savesPatchSchema = Type.Partial(savesSchema, {
  $id: 'SavesPatch'
})
export const savesPatchValidator = getValidator(savesPatchSchema, dataValidator)
export const savesPatchResolver = resolve({})

// Schema for allowed query properties
export const savesQueryProperties = Type.Pick(savesSchema, ['id', 'activityId', 'userId'])
export const savesQuerySchema = Type.Intersect(
  [
    querySyntax(savesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const savesQueryValidator = getValidator(savesQuerySchema, queryValidator)
export const savesQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
