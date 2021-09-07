/*
 * @Author: 刘晨曦
 * @Date: 2021-03-18 10:04:01
 * @LastEditTime: 2021-09-07 16:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-jwt-demo\express-based\routes\index.js
 */
import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' })
})

export default router
