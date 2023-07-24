// services/auth-management/notifier.js
export default (app) => {
  function getLink(type, hash) {
    return process.env.APP_URL + type + '?token=' + hash
  }

  async function sendEmail(email) {
    try {
      const result = await app.service('mailer').create(email)
      console.log('SENDING EMAIL', result)
      return result
    } catch (err) {
      console.error('SENDING EMAIL', err)
    }
  }
  async function sendSms(sms) {
    try {
      const result = await app.service('sms').create(sms)
      console.log('SENDING SMS', result)
    } catch (error) {
      console.log('SENDING SMS', error)
    }
  }

  return (type, user, notifierOptions = {}) => {
    let tokenLink
    let sms
    switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken)
        var phone = user.phoneNumber.substring(1)
        sms = {
          to: `+254${phone}`,
          message: `Your verification code is ${user.verifyShortToken}`,
          from: '',
          text: 'sample'
        }
        return sendSms(sms)
        break

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken)
        sms = {
          to: user.phoneNumber,
          body: `Your verification pin is ${user.verifyToken}`
        }
        return sendSms(email)
        break

      case 'sendResetPwd':
        tokenLink = getLink('reset', user.resetToken)
        email = {}
        return sendEmail(email)
        break

      case 'resetPwd':
        tokenLink = getLink('reset', user.resetToken)
        email = {}
        return sendEmail(email)
        break

      case 'passwordChange':
        email = {}
        return sendEmail(email)
        break

      case 'identityChange':
        tokenLink = getLink('verifyChanges', user.verifyToken)
        email = {}
        return sendEmail(email)
        break

      default:
        break
    }
  }
}
