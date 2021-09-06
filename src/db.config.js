/*
 * @Author: 刘晨曦
 * @Date: 2021-03-18 11:18:42
 * @LastEditTime: 2021-09-06 11:32:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node-jwt-demo\express-based\db.config.js
 */
const Sequelize = require('sequelize')
const config = {
  host: 'localhost',
  username: 'root',
  password: 'xxxxxxxx',
  database: 'jwt_demo'
}
// Object-Relational Mapping，把关系数据库的表结构映射到对象上。
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

module.exports = sequelize
