import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import api from './routes/index'
import './db/connection'

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({
  limit: 50,
}));
app.use(bodyParser.urlencoded({
  limit: 50,
  extended: false,
}));

app.use('/api/v1', api);

app.set('view engine', 'pug');
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
});

// error handler
  // eslint-disable-next-line no-unused-vars
app.use((err,req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




export default app;
