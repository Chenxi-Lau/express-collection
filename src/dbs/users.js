/*
 * @Author: 刘晨曦
 * @Date: 2021-09-06 18:23:51
 * @LastEditTime: 2021-09-07 12:00:13
 * @LastEditors: Please set LastEditors
 * @Description: 数据库映射关系
 * @FilePath: \express-collection\src\dbs\users.js
 */
import db from '../db.config'
import Sequelize from 'sequelize'

// Object-Relational Mapping，把关系数据库的表结构映射到对象上。
const usersModel = db.define(
  'users', // 数据库对应的表
  {
    userId: {
      type: Sequelize.STRING(32),
      primaryKey: true // 主键
    },
    userName: Sequelize.STRING(32),
    password: Sequelize.STRING(50)
  },
  {
    timestamps: false // 关闭Sequelize的自动添加timestamp的功能
  }
)

export default usersModel
