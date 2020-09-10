// Configuration files
import config from '../config/index'
// Dependencies
import mongoose from 'mongoose'
import fs from 'fs'

const url = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.url}/${config.mongodb.database}?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
mongoose
  .connect(url, connectionParams)
  .catch((err) => {
    console.log(err)
  });
mongoose.connection.on('connected', () => {
  console.log(`[Mongoose]: connection open to ${config.mongodb.url}/${config.mongodb.database}`)
})
mongoose.connection.on('error', (e) => {
  console.log(`[Mongoose]: connection error: ${e}`)
})
mongoose.connection.on('disconnected', () => {
  console.log('[Mongoose]: connection disconnected')
})

// Models
let files = fs.readdirSync(`${__dirname}/../models`);

let models = {};
for (let file of files) {
  let filename = file.replace(/\.[^/.]+$/, "");
  let model = `${filename[0].toUpperCase()}${filename.substring(1)}`;
  let documentModel = require(`${__dirname}/../models/${file}`)
  models[model] = documentModel;
}
export {models};
