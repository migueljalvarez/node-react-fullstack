const dotenv = require('dotenv')
dotenv.config({ silent: true })

const config = {
  mongodb: {
    url: process.env.MONGODB_URL || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DB || 'test',
    username: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  }
}

module.exports = config
