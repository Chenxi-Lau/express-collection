/*
 * @Author: 刘晨曦
 * @Date: 2021-03-18 10:04:01
 * @LastEditTime: 2021-09-06 17:57:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-jwt-demo\express-based\app.js
 */
import path from 'path'
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import routers from './src/router.config' // Router

var app = express()

const tokens = require('./src/utils/tokens')
const expressJwt = require('express-jwt')
// ! 解析Token获取用户信息
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

//! 挂载所有的路由
routers.forEach(item => {
  app.use(item.prefix, item.router)
})

//! 验证 Token 是否过期并设置白名单
app.use(expressJwt({
  secret: 'express_jwt_key',
  algorithms: ['HS256']
}).unless({
  path: ['/', '/users/', '/users/login']
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
  //! catch 401 error
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
