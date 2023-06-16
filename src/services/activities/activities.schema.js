// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'
import { likesSchema } from '../likes/likes.schema.js'

// Main data model schema
export const activitiesSchema = Type.Object(
  {
    _id: Type.Number(),
    company: Type.String(),
    name: Type.String(),
    location: Type.String(),
    description: Type.String(),
    type: Type.String(),
    isPublished: Type.Boolean(),
    coordinates: Type.String(),
    participants: Type.Array(),
    prices: Type.Array(),
    duration: Type.String(),
    requirements: Type.String(),
    tips: Type.String(),
    createdAt: Type.Number(),
    companyId: Type.Number(),
    creator: Type.Ref(userSchema),
    liker: Type.Ref(userSchema)
  },
  { $id: 'Activities', additionalProperties: false }
)
export const activitiesValidator = getValidator(activitiesSchema, dataValidator)
export const activitiesResolver = resolve({
  creator: virtual(async (activity, context) => {
    // Associate the company that created the activity
    return context.app.service('users').get(activity.companyId)
  }),
  liked: virtual(async (activity, context) => {
    const liked = await context.app.service('likes').find({
      query: {
        activityId: activity.id,
        userId: context.params.user.id
      }
    })

    if (liked.total >=1 ) {
      return true
    } else return false
  })
})

export const activitiesExternalResolver = resolve({})

// Schema for creating new entries
export const activitiesDataSchema = Type.Pick(
  activitiesSchema,
  [
    'name',
    'company',
    'location',
    'description',
    'type',
    'isPublished',
    'coordinates',
    'participants',
    'prices',
    'duration',
    'requirements',
    'tips'
  ],
  {
    $id: 'ActivitiesData'
  }
)
export const activitiesDataValidator = getValidator(activitiesDataSchema, dataValidator)
export const activitiesDataResolver = resolve({
  companyId: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
    // return 1
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
  'companyId',
  'company',
  'location',
  'type', //indoor or outdoor activity
  'description',
  'coordinates',
  'isPublished',
  'participants',
  'prices',
  'duration',
  'requirements',
  'tips',
  'createdAt'
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
  companyId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})
