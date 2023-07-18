// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const savedEventsSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number()
  },
  { $id: 'SavedEvents', additionalProperties: false }
)
export const savedEventsValidator = getValidator(savedEventsSchema, dataValidator)
export const savedEventsResolver = resolve({})

export const savedEventsExternalResolver = resolve({})

// Schema for creating new entries
export const savedEventsDataSchema = Type.Pick(savedEventsSchema, ['eventId'], {
  $id: 'SavedEventsData'
})
export const savedEventsDataValidator = getValidator(savedEventsDataSchema, dataValidator)
export const savedEventsDataResolver = resolve({
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
export const savedEventsPatchSchema = Type.Partial(savedEventsSchema, {
  $id: 'SavedEventsPatch'
})
export const savedEventsPatchValidator = getValidator(savedEventsPatchSchema, dataValidator)
export const savedEventsPatchResolver = resolve({})

// Schema for allowed query properties
export const savedEventsQueryProperties = Type.Pick(savedEventsSchema, ['id', 'eventId', 'userId'])
export const savedEventsQuerySchema = Type.Intersect(
  [
    querySyntax(savedEventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const savedEventsQueryValidator = getValidator(savedEventsQuerySchema, queryValidator)
export const savedEventsQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
