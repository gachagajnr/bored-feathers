// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const bucketListEventsSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number()
  },
  { $id: 'BucketListEvents', additionalProperties: false }
)
export const bucketListEventsValidator = getValidator(bucketListEventsSchema, dataValidator)
export const bucketListEventsResolver = resolve({})

export const bucketListEventsExternalResolver = resolve({})

// Schema for creating new entries
export const bucketListEventsDataSchema = Type.Pick(bucketListEventsSchema, ['eventId'], {
  $id: 'BucketListEventsData'
})
export const bucketListEventsDataValidator = getValidator(bucketListEventsDataSchema, dataValidator)
export const bucketListEventsDataResolver = resolve({
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
export const bucketListEventsPatchSchema = Type.Partial(bucketListEventsSchema, {
  $id: 'BucketListEventsPatch'
})
export const bucketListEventsPatchValidator = getValidator(bucketListEventsPatchSchema, dataValidator)
export const bucketListEventsPatchResolver = resolve({})

// Schema for allowed query properties
export const bucketListEventsQueryProperties = Type.Pick(bucketListEventsSchema, ['id', 'eventId', 'userId'])
export const bucketListEventsQuerySchema = Type.Intersect(
  [
    querySyntax(bucketListEventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const bucketListEventsQueryValidator = getValidator(bucketListEventsQuerySchema, queryValidator)
export const bucketListEventsQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
