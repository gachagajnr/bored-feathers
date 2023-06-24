// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import { oauth, OAuthStrategy } from '@feathersjs/authentication-oauth'


class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile)

    // this will grab the picture and email address of the Google profile
    
    const [fname, lname]=profile.name.split(' ')
    return {
      ...baseData,
      firstName:fname,
      lastName:lname,
      avatar: profile.picture,
      email: profile.email,
      phoneNumber:''
    }
  }
}

class FacebookStrategy extends OAuthStrategy {
  async getProfile(authResult) {
    // This is the OAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token

    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      params: {
        // There are
        fields: 'id,name,email,picture'
      }
    })

    return data
  }

  async getEntityData(profile) {
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile)

    console.log(baseData)
    return {
      ...baseData,
      firstName: profile.name,
      lastName:profile.name,
      email: profile.email,
      avatar:profile.picture,
      phoneNumber:''
    }
  }
}

export const authentication = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('google', new GoogleStrategy())
  authentication.register('facebook', new FacebookStrategy())

  app.use('authentication', authentication)
  app.configure(oauth())
}
