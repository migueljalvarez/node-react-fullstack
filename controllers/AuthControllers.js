import asyncWrap from '../utils/asyncWrap.js'
import { auth as userAuth } from '../service/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ silent: true })

const auth = asyncWrap(async (req, res, next)=>{
  const {email, password} = req.body
  const user = await userAuth(email, password)
  req.user = user
  next()
})
const login = asyncWrap(async (req, res)=>{
  const secret = process.env.JWT_SECRET
  const payload = {
    id: req.user._id,
    email: req.user.email
  }
  const token = jwt.sign(payload, secret, {expiresIn: process.env.JWT_EXPIRATION_TIME})
  if (token) {
    res.status(200).json({
      token: token,
    });
  }
})
export default{ auth, login }