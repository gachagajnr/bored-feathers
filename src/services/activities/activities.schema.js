// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const activitiesSchema = Type.Object(
  {
    id: Type.Number(),
    activityName: Type.String(),
    activityLocation: Type.String(),
    coordinates: Type.String(),
    description: Type.String()
  },
  { $id: 'Activities', additionalProperties: false }
)
export const activitiesValidator = getValidator(activitiesSchema, dataValidator)
export const activitiesResolver = resolve({})

export const activitiesExternalResolver = resolve({})

// Schema for creating new entries
export const activitiesDataSchema = Type.Pick(activitiesSchema, ['text'], {
  $id: 'ActivitiesData'
})
export const activitiesDataValidator = getValidator(activitiesDataSchema, dataValidator)
export const activitiesDataResolver = resolve({})

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
  'description'
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
export const activitiesQueryResolver = resolve({})
