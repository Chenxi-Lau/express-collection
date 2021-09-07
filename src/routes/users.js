/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2021-09-07 19:17:24
 * @LastEditors: Please set LastEditors
 * @Description: 测试
 * @FilePath: \express-collection\src\routes\users.js
 */
import express from 'express'
import usersModel from '../dbs/users'
import Response from '../controller/response'
import { TokenUtil, AesCrypto } from '../utils'

const router = express.Router()
const response = new Response()
const tokenInstance = new TokenUtil()
const aesCrypto = new AesCrypto()

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource')
})

/* POST User Login */
router.post('/login', async (req, res) => {
  console.log(req, 'req')
  const { userName, password } = req.query
  if (!(userName && password)) {
    return res.json(response.createCustomResponse('000002', '参数不合法'))
  }
  const result = await usersModel.findAll({
    where: {
      userName: userName,
      password: aesCrypto.encrypt(userName, password)
    }
  })
  if (result.length) {
    const token = await tokenInstance.sign(result[0].userName, result[0].userId)
    return res.json(response.createItemResponse({ userInfo: result[0], token }))
  } else {
    return res.json(response.createCustomResponse('000002', '用户名或密码错误'))
  }
})

/* POST User Auth */
router.post('/auth', (req, res) => {
  const { data: { name, _id } } = req.data
  if (name && _id) {
    return res.json(response.createItemResponse({ userName: name, userId: _id }))
  } else {
    return res.json(response.createCustomResponse('-1', '未获取到用户信息'))
  }
})

export default router
