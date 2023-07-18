// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'

const formats = [
  'date-time',
  'time',
  'date',
  'id',
  'email',
  'name',
  'isPublished',
  'company',
  'location',
  'description',
  'activityId',
  'companyName',
  'companyPhone',
  'companyLocation',
  'companyTown',
  'companyStreet',
  'companyBio',
   
  'type',
  'tag',
  'coordinates',
  'participants',
  'prices',
  'verifyExpires',
  'verifyChanges',
  'resetAttempts',
  'resetExpires',
  'resetShortToken',
  'resetToken',
  'verifyShortToken',
  'verifyToken',
  'duration',
  'requirements',
  'tips',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export const dataValidator = addFormats(new Ajv({}), formats)

export const queryValidator = addFormats(
  new Ajv({
    coerceTypes: true
  }),
  formats
)
