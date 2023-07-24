// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const smsSchema = Type.Object(
  {
    id: Type.Number(),
    to: Type.String(),
    message: Type.String(),
    from: Type.String()
  },
  { $id: 'Sms', additionalProperties: false }
)
export const smsValidator = getValidator(smsSchema, dataValidator)
export const smsResolver = resolve({})

export const smsExternalResolver = resolve({})

// Schema for creating new entries
export const smsDataSchema = Type.Pick(smsSchema, ['to', 'message', 'from'], {
  $id: 'SmsData'
})
export const smsDataValidator = getValidator(smsDataSchema, dataValidator)
export const smsDataResolver = resolve({})

// Schema for updating existing entries
export const smsPatchSchema = Type.Partial(smsSchema, {
  $id: 'SmsPatch'
})
export const smsPatchValidator = getValidator(smsPatchSchema, dataValidator)
export const smsPatchResolver = resolve({})

// Schema for allowed query properties
export const smsQueryProperties = Type.Pick(smsSchema, ['id', 'text'])
export const smsQuerySchema = Type.Intersect(
  [
    querySyntax(smsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const smsQueryValidator = getValidator(smsQuerySchema, queryValidator)
export const smsQueryResolver = resolve({})
