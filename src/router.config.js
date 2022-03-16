/*
 * @Author: 刘晨曦
 * @Date: 2021-03-17 09:36:24
 * @LastEditTime: 2021-09-16 13:55:22
 * @LastEditors: Please set LastEditors
 * @Description: 所有路由的入口文件
 * @FilePath: \server\router.config.js
 */
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import webSocketRouter from './routes/websocket'

export default [
  {
    prefix: '/',
    router: indexRouter
  }, {
    prefix: '/api/user',
    router: usersRouter
  }, {
    prefix: '/api/ws',
    router: webSocketRouter
  }
]
