import mongoose from 'mongoose'
import { generateUserSchema } from '../schemas/index.js'
const userModel = mongoose.model(
  'User',
  generateUserSchema(mongoose),
)
export {userModel}
