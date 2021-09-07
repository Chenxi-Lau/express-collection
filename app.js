/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2021-09-07 19:17:59
 * @LastEditors: Please set LastEditors
 * @Description: 项目入口文件
 * @FilePath: \express-collection\app.js
 */
import path from 'path'
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import routers from './src/router.config' // Router
import tokens from './src/utils'
import expressJwt from 'express-jwt'
import { SIGN_KEY } from './src/constant'

const app = express()

// registered all routers
routers.forEach(item => {
  app.use(item.prefix, item.router)
})

// parse token
app.use(function (req, res, next) {
  const token = req.headers['authorization']
  if (token == undefined) {
    return next()
  } else {
    tokens.verify(token).then(data => {
      req.data = data
      return next()
    }).catch(() => {
      return next()
    })
  }
})

// authentication token
app.use(expressJwt({
  secret: SIGN_KEY,
  algorithms: ['HS256']
}).unless({
  path: ['/', '/api/user/', '/api/user/login']
}))

// view engine setup
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // catch 401 error
  if (err.name === 'UnauthorizedError') {
    res.status(401)
    res.json({
      code: '-1',
      msg: err.message,
      data: null
    })
    return
  }
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
