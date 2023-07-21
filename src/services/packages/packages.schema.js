// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
 
// Main data model schema
export const packagesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    price: Type.Number(),
     addons: Type.Array()
  },
  { $id: 'Packages', additionalProperties: false }
)
export const packagesValidator = getValidator(packagesSchema, dataValidator)
export const packagesResolver = resolve({})

export const packagesExternalResolver = resolve({})

// Schema for creating new entries
export const packagesDataSchema = Type.Pick(packagesSchema, ['name', 'price', 'addons'], {
  $id: 'PackagesData'
})
export const packagesDataValidator = getValidator(packagesDataSchema, dataValidator)
export const packagesDataResolver = resolve({
  owner: async (_value, activity, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user.id
  }
})

// Schema for updating existing entries
export const packagesPatchSchema = Type.Partial(packagesSchema, {
  $id: 'PackagesPatch'
})
export const packagesPatchValidator = getValidator(packagesPatchSchema, dataValidator)
export const packagesPatchResolver = resolve({})

// Schema for allowed query properties
export const packagesQueryProperties = Type.Pick(packagesSchema, ['id', 'name', 'owner', 'price', 'addons'])
export const packagesQuerySchema = Type.Intersect(
  [
    querySyntax(packagesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const packagesQueryValidator = getValidator(packagesQuerySchema, queryValidator)
export const packagesQueryResolver = resolve({
  owner: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})
