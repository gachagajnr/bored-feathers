// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { userSchema } from '../users/users.schema.js'

// Main data model schema
export const companiesSchema = Type.Object(
  {
    id: Type.Number(),
    onwer: Type.Number(),
    companyName: Type.String(),
    companyPhone: Type.String(),
    companyLocation: Type.String(),
    companyTown: Type.String(),
    companyBio: Type.String(),
    companyStreet: Type.String(),
    owner: Type.Ref(userSchema)
  },
  { $id: 'Companies', additionalProperties: false }
)
export const companiesValidator = getValidator(companiesSchema, dataValidator)
export const companiesResolver = resolve({
  owner: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
  },
  socials: virtual(async (company, context) => {
    // Associate the company that created the activity
    return context.app.service('social-links').find({
      query: {
        parentCompany: company.id,
        $select: ['instagram','facebook', 'twitter', 'linkedin']
      }
    })
  })
})

export const companiesExternalResolver = resolve({})

// Schema for creating new entries
export const companiesDataSchema = Type.Pick(
  companiesSchema,
  ['companyName', 'companyPhone', 'companyLocation', 'companyTown', 'companyStreet', 'companyBio'],
  {
    $id: 'CompaniesData'
  }
)
export const companiesDataValidator = getValidator(companiesDataSchema, dataValidator)
export const companiesDataResolver = resolve({
  owner: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
    // return 1
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const companiesPatchSchema = Type.Partial(companiesSchema, {
  $id: 'CompaniesPatch'
})
export const companiesPatchValidator = getValidator(companiesPatchSchema, dataValidator)
export const companiesPatchResolver = resolve({})

// Schema for allowed query properties
export const companiesQueryProperties = Type.Pick(companiesSchema, [
  'id',
  'companyName',
  'companyPhone',
  'companyLocation',
  'companyTown',
  'companyStreet',
  'companyBio'
])
export const companiesQuerySchema = Type.Intersect(
  [
    querySyntax(companiesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const companiesQueryValidator = getValidator(companiesQuerySchema, queryValidator)
export const companiesQueryResolver = resolve({
  owner: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})
