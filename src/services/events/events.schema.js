// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const eventsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    date: Type.Number(),
    location: Type.String(),
    fee: Type.String(),
    info: Type.String(),
    requirements: Type.String(),
    sponsors: Type.String(),
    coordinates: Type.String()
  },
  { $id: 'Events', additionalProperties: false }
)
export const eventsValidator = getValidator(eventsSchema, dataValidator)
export const eventsResolver = resolve({})

export const eventsExternalResolver = resolve({})

// Schema for creating new entries
export const eventsDataSchema = Type.Pick(eventsSchema, ['text'], {
  $id: 'EventsData'
})
export const eventsDataValidator = getValidator(eventsDataSchema, dataValidator)
export const eventsDataResolver = resolve({})

// Schema for updating existing entries
export const eventsPatchSchema = Type.Partial(eventsSchema, {
  $id: 'EventsPatch'
})
export const eventsPatchValidator = getValidator(eventsPatchSchema, dataValidator)
export const eventsPatchResolver = resolve({})

// Schema for allowed query properties
export const eventsQueryProperties = Type.Pick(eventsSchema, ['id', 'text'])
export const eventsQuerySchema = Type.Intersect(
  [
    querySyntax(eventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const eventsQueryValidator = getValidator(eventsQuerySchema, queryValidator)
export const eventsQueryResolver = resolve({})
