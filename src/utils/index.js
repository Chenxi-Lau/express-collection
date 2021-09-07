/*
 * @Author: 刘晨曦
 * @Date: 2021-03-18 14:10:55
 * @LastEditTime: 2021-09-07 16:52:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-jwt-demo\express-based\utils\token.js
 */
import CryptoJS from 'crypto-js'
import jsonwebtoken from 'jsonwebtoken'
import { SIGN_KEY } from '../constant'

export class TokenUtil {
  /**
   * @description: jsonwebtoken 签名
   * @param {*} username
   * @param {*} userId
   * @return {*}
   */
  sign (username, userId) {
    return new Promise((resolve) => {
      const token = jsonwebtoken.sign( {
        name: username,
        _id: userId
      }, SIGN_KEY, {
        expiresIn: '1h'
      } )
      resolve(token)
    })
  }

  /**
   * @description: jsonwebtoken 认证
   * @param {*} token
   * @return {*}
   */
  verify (token) {
    return new Promise((resolve) => {
      const info = jsonwebtoken.verify(token.split(' ')[1], SIGN_KEY)
      resolve(info)
    })
  }
}

export class AesCrypto {
  /**
 * @description: AES/ECB/PKCS5Padding 加密
 * @param {*} name
 * @param {*} password
 * @return {*} 加密后的密文
 */
  encrypt (name = '', password = '') {
    try {
      const hash = CryptoJS.MD5(name).toString().substring(0, 16) // 产生秘钥
      const key = CryptoJS.enc.Utf8.parse(hash)
      const message = CryptoJS.enc.Utf8.parse(password)
      const encrypted = CryptoJS.AES.encrypt(message, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    } catch (err) {
      return false
    }
  }

  /**
 * @description: AES/ECB/PKCS5Padding 解密
 * @param {*} name
 * @param {*} password
 * @return {*} 解密后的明文
 */
  decrypt (name, password) {
    try {
      const hash = CryptoJS.MD5(name).toString().substring(0, 16) // 产生秘钥
      const key = CryptoJS.enc.Utf8.parse(hash)
      const decrypt = CryptoJS.AES.decrypt(password, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    } catch (err) {
      return false
    }
  }
}
