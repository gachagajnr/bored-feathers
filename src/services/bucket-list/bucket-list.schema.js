// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const bucketListSchema = Type.Object(
  {
    id: Type.Number(),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    activityId: Type.Number()
  },
  { $id: 'BucketList', additionalProperties: false }
)
export const bucketListValidator = getValidator(bucketListSchema, dataValidator)
export const bucketListResolver = resolve({})

export const bucketListExternalResolver = resolve({})

// Schema for creating new entries
export const bucketListDataSchema = Type.Pick(bucketListSchema, ['activityId'], {
  $id: 'BucketListData'
})
export const bucketListDataValidator = getValidator(bucketListDataSchema, dataValidator)
export const bucketListDataResolver = resolve({
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
export const bucketListPatchSchema = Type.Partial(bucketListSchema, {
  $id: 'BucketListPatch'
})
export const bucketListPatchValidator = getValidator(bucketListPatchSchema, dataValidator)
export const bucketListPatchResolver = resolve({})

// Schema for allowed query properties
export const bucketListQueryProperties = Type.Pick(bucketListSchema, ['id', 'activityId', 'userId'])
export const bucketListQuerySchema = Type.Intersect(
  [
    querySyntax(bucketListQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const bucketListQueryValidator = getValidator(bucketListQuerySchema, queryValidator)
export const bucketListQueryResolver = resolve({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }

    return value
  }
})
