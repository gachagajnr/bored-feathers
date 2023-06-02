// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const activitiesSchema = Type.Object(
  {
    id: Type.Number(),
    activityName: Type.String(),
    activityLocation: Type.String(),
    coordinates: Type.String(),
    description: Type.String(),
    createdAt: Type.Number(),
    ownerId: Type.Number(),
    owner: Type.Ref(userSchema)
  },
  { $id: 'Activities', additionalProperties: false }
)
export const activitiesValidator = getValidator(activitiesSchema, dataValidator)
export const activitiesResolver = resolve({
  owner: virtual(async (activity, context) => {
    // Associate the user that sent the message
    return context.app.service('users').get(activity.ownerId)
  })
})

export const activitiesExternalResolver = resolve({})

// Schema for creating new entries
export const activitiesDataSchema = Type.Pick(activitiesSchema, ['text'], {
  $id: 'ActivitiesData'
})
export const activitiesDataValidator = getValidator(activitiesDataSchema, dataValidator)
export const activitiesDataResolver = resolve({
  ownerId: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const activitiesPatchSchema = Type.Partial(activitiesSchema, {
  $id: 'ActivitiesPatch'
})
export const activitiesPatchValidator = getValidator(activitiesPatchSchema, dataValidator)
export const activitiesPatchResolver = resolve({})

// Schema for allowed query properties
export const activitiesQueryProperties = Type.Pick(activitiesSchema, [
  'id',
  'activityName',
  'activityLocation',
  'coordinates',
  'description',
  'createdAt',
  'ownerId'
])
export const activitiesQuerySchema = Type.Intersect(
  [
    querySyntax(activitiesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const activitiesQueryValidator = getValidator(activitiesQuerySchema, queryValidator)
export const activitiesQueryResolver = resolve({
  ownerId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
