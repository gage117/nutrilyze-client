const AuthService = require('../services/auth-api-service')

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''

  let basicToken
  if (!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(401).json({ error: 'Missing basic token' })
  } else {
    basicToken = authToken.slice('basic '.length, authToken.length)
  }

  const [tokenEmailName, tokenPassword] = AuthService.parseBasicToken(basicToken)

  if (!tokenEmailName || !tokenPassword) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  AuthService.getEmailWithEmailName(
    req.app.get('db'),
    tokenEmailName
  )
    .then(email => {
      if (!email || email.password !== tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request' })
      }

      req.email = email
      next()
    })
    .catch(next)
}

module.exports = {
  requireAuth,
}
