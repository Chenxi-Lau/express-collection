/*
 * @Author: 刘晨曦
 * @Date: 2021-09-16 11:45:40
 * @LastEditTime: 2021-09-16 13:54:45
 * @LastEditors: Please set LastEditors
 * @Description: Websocket 测试接口
 * @FilePath: \express-collection\src\routes\websocket.js
 */
/** 理解练习webSocket通信机制，后端使用express express-ws进行websocket支持 */
import express from 'express'
import expressWs from 'express-ws'
const router = express.Router()
expressWs(router)

router.ws('/test', (ws, req) => {
  try {
    console.log(req)
    ws.send('连接成功')
    const interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send(Math.random().toFixed(2))
      } else {
        clearInterval(interval)
      }
    }, 2000)

    ws.on('message', msg => {
      ws.send(msg)
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
