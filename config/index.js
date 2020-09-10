import dotenv from 'dotenv'
dotenv.config({ silent: true })
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
const s3Options = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
}
const s3 = new AWS.S3(s3Options)

const config = {
  mongodb: {
    url: process.env.MONGODB_URL || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DB || 'test',
    username: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  },
  multer: { 
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, `images/${file.originalname}`) //use Date.now() for unique file keys
      },
    }),
  }
}

export default config
