// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const likedEventsSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number()
  },
  { $id: 'LikedEvents', additionalProperties: false }
)
export const likedEventsValidator = getValidator(likedEventsSchema, dataValidator)
export const likedEventsResolver = resolve({})

export const likedEventsExternalResolver = resolve({})

// Schema for creating new entries
export const likedEventsDataSchema = Type.Pick(likedEventsSchema, ['eventId'], {
  $id: 'LikedEventsData'
})
export const likedEventsDataValidator = getValidator(likedEventsDataSchema, dataValidator)
export const likedEventsDataResolver = resolve({
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
export const likedEventsPatchSchema = Type.Partial(likedEventsSchema, {
  $id: 'LikedEventsPatch'
})
export const likedEventsPatchValidator = getValidator(likedEventsPatchSchema, dataValidator)
export const likedEventsPatchResolver = resolve({})

// Schema for allowed query properties
export const likedEventsQueryProperties = Type.Pick(likedEventsSchema, ['id', 'eventId', 'userId'])
export const likedEventsQuerySchema = Type.Intersect(
  [
    querySyntax(likedEventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const likedEventsQueryValidator = getValidator(likedEventsQuerySchema, queryValidator)
export const likedEventsQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
