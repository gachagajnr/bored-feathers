// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { activitiesSchema } from '../activities/activities.schema.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const likesSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number(),
    activity: Type.Ref(activitiesSchema)
  },
  { $id: 'Likes', additionalProperties: false }
)
export const likesValidator = getValidator(likesSchema, dataValidator)
export const likesResolver = resolve({})

export const likesExternalResolver = resolve({})

// Schema for creating new entries
export const likesDataSchema = Type.Pick(likesSchema, ['activityId'], {
  $id: 'LikesData'
})
export const likesDataValidator = getValidator(likesDataSchema, dataValidator)
export const likesDataResolver = resolve({
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
export const likesPatchSchema = Type.Partial(likesSchema, {
  $id: 'LikesPatch'
})
export const likesPatchValidator = getValidator(likesPatchSchema, dataValidator)
export const likesPatchResolver = resolve({})

// Schema for allowed query properties
export const likesQueryProperties = Type.Pick(likesSchema, ['id', 'activityId', 'userId'])
export const likesQuerySchema = Type.Intersect(
  [
    querySyntax(likesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const likesQueryValidator = getValidator(likesQuerySchema, queryValidator)
export const likesQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
