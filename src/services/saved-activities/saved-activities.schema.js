// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const savedActivitiesSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'SavedActivities', additionalProperties: false }
)
export const savedActivitiesValidator = getValidator(savedActivitiesSchema, dataValidator)
export const savedActivitiesResolver = resolve({})

export const savedActivitiesExternalResolver = resolve({})

// Schema for creating new entries
export const savedActivitiesDataSchema = Type.Pick(savedActivitiesSchema, ['text'], {
  $id: 'SavedActivitiesData'
})
export const savedActivitiesDataValidator = getValidator(savedActivitiesDataSchema, dataValidator)
export const savedActivitiesDataResolver = resolve({})

// Schema for updating existing entries
export const savedActivitiesPatchSchema = Type.Partial(savedActivitiesSchema, {
  $id: 'SavedActivitiesPatch'
})
export const savedActivitiesPatchValidator = getValidator(savedActivitiesPatchSchema, dataValidator)
export const savedActivitiesPatchResolver = resolve({})

// Schema for allowed query properties
export const savedActivitiesQueryProperties = Type.Pick(savedActivitiesSchema, ['id', 'text'])
export const savedActivitiesQuerySchema = Type.Intersect(
  [
    querySyntax(savedActivitiesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const savedActivitiesQueryValidator = getValidator(savedActivitiesQuerySchema, queryValidator)
export const savedActivitiesQueryResolver = resolve({})
