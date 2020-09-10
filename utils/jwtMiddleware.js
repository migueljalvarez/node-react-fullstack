import jwt from 'jsonwebtoken'
import asyncWrap from './asyncWrap'
import dotenv from 'dotenv'
dotenv.config({ silent: true })
const secret = process.env.JWT_SECRET

const verifyToken = asyncWrap(async (req, res, next) => {
  let accessToken = req.headers['authorization']
  if (!accessToken) {
    res.status(401).json({
      message: 'Authorization header is not present',
    })
  } else {
    accessToken = accessToken.split(' ')
    if (accessToken[0] !== 'Bearer') {
      res.status(401).json({
        message: 'Invalid authorization header format',
      })
    } else {
      jwt.verify(accessToken[1], secret, (err, token) => {
        if (err) {
          res.status(500).json(err)
        } else if (token) {
          req.accessToken = token
          next()
        }
      })
    }
  }
})
 export default {verifyToken}