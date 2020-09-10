import mongoTimestamp from 'mongoose-timestamp'
import mongoDelete from 'mongoose-delete'
import mongoosePaginate from 'mongoose-paginate-v2'
import generatePaths from './helpers/generateSchemaPaths.js'
const generatePostSchema = (mongoose) => {
  const { Schema } = mongoose
  const postSchema = new Schema({
    title: { type: String},
    imgUrl: { type: String},
    description: { type: String},
    createdBy : { type: String}
  })
  postSchema.statics.getAllowedProperties = function() {
    return generatePaths({ paths: this.schema.paths, mongoose })
  }
  postSchema.plugin(mongoDelete, {
    deletedAt: true,
    overrideMethods: ['find', 'findOne', 'countDocuments'],
  })
  postSchema.plugin(mongoTimestamp)
  postSchema.plugin(mongoosePaginate)
  return postSchema
}
export { generatePostSchema }
