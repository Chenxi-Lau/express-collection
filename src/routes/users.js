/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2021-09-08 16:59:25
 * @LastEditors: Please set LastEditors
 * @Description: POST请求修改为BodyParse的方式
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
  const { userName, password } = req.body
  if (!(userName && password)) {
    return res.json(response.createCustomResponse('-1', 'Params are not valid'))
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
    return res.json(response.createCustomResponse('-1', '用户名或密码错误'))
  }
})

/* POST User Auth */
router.post('/auth', (req, res) => {
  if (req.data) {
    const { name, _id } = req.data
    return res.json(response.createItemResponse({ userName: name, userId: _id }))
  } else {
    return res.json(response.createCustomResponse('-1', 'No user information is obtained.'))
  }
})

export default router
