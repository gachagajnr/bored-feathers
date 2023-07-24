// services/auth-management/notifier.js
export default (app) => {
  function getLink(type, hash) {
    return 'https://www.mahalikenya.com' + type + '?token=' + hash
  }

  async function sendEmail(email) {
    try {
      const result = await app.service('mailer').create(email)
      // console.log('SENDING EMAIL', result)
      return result
    } catch (err) {
      // console.error('SENDING EMAIL', err)
    }
  }

  return (type, user, notifierOptions = {}) => {
    let tokenLink
    let email
    const fromEmail='mahalikenya.com'
    switch (type) {
      case 'resendVerifySignup': //sending the user the verification email
        tokenLink = getLink('verify', user.verifyToken)
        email = {
          from: fromEmail,
          to: user.email,
          subject: 'Verify Signup',
          html: tokenLink
        }
        return sendEmail(email)
        break

      case 'verifySignup': // confirming verification
        tokenLink = getLink('verify', user.verifyToken)
        email = {
          from: fromEmail,
          to: user.email,
          subject: 'Confirm Signup',
          html: 'Thanks for verifying your email'
        }
        return sendEmail(email)
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
