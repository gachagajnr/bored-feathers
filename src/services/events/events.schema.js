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
    venue: Type.String(),
    fee: Type.String(),
    info: Type.String(),
    sponsors: Type.String(),
    coordinates: Type.String(),
    createdAt: Type.Number(),
    parentCompany: Type.Number(),
    creatorId: Type.Number()
  },
  { $id: 'Events', additionalProperties: false }
)
export const eventsValidator = getValidator(eventsSchema, dataValidator)
export const eventsResolver = resolve({
 
})

export const eventsExternalResolver = resolve({})

// Schema for creating new entries
export const eventsDataSchema = Type.Pick(
  eventsSchema,
  ['name', 'date', 'venue', 'fee', 'info', 'coordinates', 'sponsors'],
  {
    $id: 'EventsData'
  }
)
export const eventsDataValidator = getValidator(eventsDataSchema, dataValidator)
export const eventsDataResolver = resolve({
  creatorId: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
  },
  parentCompany: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.company
  },

  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const eventsPatchSchema = Type.Partial(eventsSchema, {
  $id: 'EventsPatch'
})
export const eventsPatchValidator = getValidator(eventsPatchSchema, dataValidator)
export const eventsPatchResolver = resolve({})

// Schema for allowed query properties
export const eventsQueryProperties = Type.Pick(eventsSchema, [
  'id',
  'name',
  'date',
  'venue',
  'fee',
  'info',
  'parentCompany',
  'coordinates',
  'sponsors'
])
export const eventsQuerySchema = Type.Intersect(
  [
    querySyntax(eventsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const eventsQueryValidator = getValidator(eventsQuerySchema, queryValidator)
export const eventsQueryResolver = resolve({
  creatorId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})
