require('dotenv').config()

const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log('Authorization Header:', authHeader) // Check what the header looks like

  const token = authHeader && authHeader.split(' ')[1] // Bearer Token

  if (!token) {
    console.log('Token not provided')
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    console.log('Verifying token...')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log('Decoded Token:', decoded)
    req.user = decoded
    next()
  } catch (error) {
    console.error("Token error:", error)
    return res.status(403).json({ message: 'Invalid token', error: error.message })
  }
}

module.exports = authenticateToken
