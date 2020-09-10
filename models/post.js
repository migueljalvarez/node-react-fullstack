import mongoose from 'mongoose'
import { generatePostSchema } from '../schemas/index.js'
const postModel = mongoose.model(
  'Post',
  generatePostSchema(mongoose),
)
export {postModel}
