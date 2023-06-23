// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'
import { likesSchema } from '../likes/likes.schema.js'

// Main data model schema
export const activitiesSchema = Type.Object(
  {
    id: Type.Number(),
    company: Type.String(),
    name: Type.String(),
    location: Type.String(),
    description: Type.String(),
    type: Type.String(),
    isPublished: Type.Boolean(),
    coordinates: Type.String(),
    participants: Type.Array(),
    prices: Type.Array(),
    tag: Type.String(),
    duration: Type.String(),
    requirements: Type.String(),
    tips: Type.String(),
    liked: Type.String(),
    saved: Type.String(),
    createdAt: Type.Number(),
    parentCompany: Type.Number(),
    creatorId: Type.Number(),
    creator: Type.String(),
    companyPhone: Type.String(),
    liker: Type.Ref(userSchema)
    // act: Type.Ref(activitiesSchema)
  },
  { $id: 'Activities', additionalProperties: false }
)
export const activitiesValidator = getValidator(activitiesSchema, dataValidator)
export const activitiesResolver = resolve({
  creator: virtual(async (activity, context) => {
    // Associate the company that created the activity
    return context.app.service('users').get(activity.creatorId, {
      query: {
        $select: ['email']
      }
    })
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
    'tag',
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
  creatorId: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
    // return 1
  },
  parentCompany: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.company
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
  'creatorId',
  'company',
  'location',
  'type', //indoor or outdoor activity
  'description',
  'parentCompany',
  'coordinates',
  'tag',
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
    Type.Object(
      {
        // arrayField: { $in: Type.Array(Type.String()) },
        // $select: Type.Array(Type.String())
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
)
export const activitiesQueryValidator = getValidator(activitiesQuerySchema, queryValidator)
export const activitiesQueryResolver = resolve({
  creatorId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})

//  companyPhone: virtual(async (activity, context) => {
//   // Associate the record with the id of the authenticated user
//   return context.app.service('companies').find({
//     query: {
//       id: activity.parentCompany,
//       $select: ['companyPhone'],
//       $limit: 1
//     }
//   })
//   // return 1
// }),
