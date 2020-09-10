import mongoTimestamp from 'mongoose-timestamp'
import mongoDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import uniqueValidator from 'mongoose-unique-validator'
import generatePaths from './helpers/generateSchemaPaths.js'
const generateUserSchema = (mongoose) => {
  const { Schema } = mongoose
  const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
  userSchema.statics.getAllowedProperties = function() {
    return generatePaths({ paths: this.schema.paths, mongoose })
  }
  userSchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ['find', 'findOne', 'countDocuments'],
  })
  userSchema.plugin(mongoTimestamp)
  userSchema.plugin(uniqueValidator)
  userSchema.plugin(mongoosePaginate)
  
  return userSchema
}
export { generateUserSchema }
