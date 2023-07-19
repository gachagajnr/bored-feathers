// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const socialLinksSchema = Type.Object(
  {
    id: Type.Number(),
    facebook: Type.String(),
    instagram: Type.String(),
    twitter: Type.String(),
    linkedin: Type.String(),
    parentCompany: Type.Number(),
    creatorId: Type.Number()
  },
  { $id: 'SocialLinks', additionalProperties: false }
)
export const socialLinksValidator = getValidator(socialLinksSchema, dataValidator)
export const socialLinksResolver = resolve({})

export const socialLinksExternalResolver = resolve({})

// Schema for creating new entries
export const socialLinksDataSchema = Type.Pick(
  socialLinksSchema,
  ['instagram', 'facebook', 'twitter', 'linkedin'],
  {
    $id: 'SocialLinksData'
  }
)
export const socialLinksDataValidator = getValidator(socialLinksDataSchema, dataValidator)
export const socialLinksDataResolver = resolve({
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
export const socialLinksPatchSchema = Type.Partial(socialLinksSchema, {
  $id: 'SocialLinksPatch'
})
export const socialLinksPatchValidator = getValidator(socialLinksPatchSchema, dataValidator)
export const socialLinksPatchResolver = resolve({})

// Schema for allowed query properties
export const socialLinksQueryProperties = Type.Pick(socialLinksSchema, [
  'id',
  'instagram',
  'facebook',
  'twitter',
  'linkedin',
  'parentCompany'
])
export const socialLinksQuerySchema = Type.Intersect(
  [
    querySyntax(socialLinksQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const socialLinksQueryValidator = getValidator(socialLinksQuerySchema, queryValidator)
export const socialLinksQueryResolver = resolve({
  creatorId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user.id
    }
    return value
  }
})
