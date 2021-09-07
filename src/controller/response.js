/*
 * @Author: 刘晨曦
 * @Date: 2021-09-07 16:12:33
 * @LastEditTime: 2021-09-07 16:41:22
 * @LastEditors: Please set LastEditors
 * @Description: 相应的类
 * @FilePath: \express-collection\src\controller\response.js
 */
export default class Response {
  /**
   * @description: 成功返回列表格式
   * @param {*} list
   * @param {*} total
   * @param {*} pageNo
   * @param {*} pageSize
   * @return {*}
   */
  createListResponse (list, total, pageNo, pageSize) {
    return {
      code: '0',
      msg: 'SUCCESS',
      data: { list, total, pageNo, pageSize }
    }
  }

  /**
   * @description: 成功返回格式
   * @param {*} data
   * @return {*}
   */
  createItemResponse (data) {
    return {
      code: '0',
      msg: 'SUCCESS',
      data
    }
  }

  /**
   * @description: 通用返回格式
   * @param {*} code 响应码
   * @param {*} msg 相应消息
   * @param {*} data 相应数据
   * @return {*}
   */
  createCustomResponse (code, msg, data = null) {
    return { code, msg, data }
  }
}
