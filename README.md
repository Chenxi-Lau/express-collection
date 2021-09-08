<!--
 * @Author: 刘晨曦 <lcxcsy@126.com>
 * @Date: 2021-03-18 10:04:42
 * @LastEditTime: 2021-09-08 17:06:35
 * @LastEditors: Please set LastEditors
 * @Description: README
 * @FilePath: \node-jwt-demo\express-based\README.md
-->

# Express-Collection

> Express 技术栈，整合一些相关项目。

Main 分支为通过 express-generator 生成的原始项目，做了目录结构和部分代码调整。因为对企业级的 Express 项目没有接触过，项目暂时比较简陋，后续持续更新...

### 基本指令

```sh
# 下载本项目
git clone git@github.com:Chenxi-Lau/express-collection.git

# 安装依赖
npm install

# 运行项目
npm start
```

### 主要变动

1. 目录结构变动：

```sh
├── app.js             // 主入口
├── .babelrc           // babel配置
├── bin
│ └── www.js
├── package.json       // 依赖
├── public             // 公共文件
│ ├── images
│ └── stylesheets
│   └── style.css
└── src
  ├── controller       // 通用函数的封装
  ├── dbs              // 数据库映射
  ├── routes           // 单个路由
  │ ├── index.js
  │ └── users.js
  ├── utils            // 工具函数
  └── views            // 视图
    ├── error.pug
    ├── index.pug
    └── layout.pug
  ├── db.config.js     // 数据库的相关配置
  └── router.config.js // 路由的统一入口文件
```

2. 支持 import/export

项目通过安装 babel-core、babel-preset-env 支持 import/export 语法。

```json
{
  "presets": ["env"]
}
```

package.json 中 start 命令修改为：**babel-node ./bin/www**，如果提示 babel-node 命令无法识别，需要全局安装 babel-cli。

```sh
npm install babel-cli -g
```

3. 支持连接 MySQL 数据库

```js
import Sequelize from 'sequelize';
const config = {
  host: 'localhost',
  username: 'root',
  password: 'xxxxxxxx',
  database: 'sql_demo'
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

export default sequelize;
```

4. 支持自启动

```sh
npm install --save-dev nodemon
```

package.json 中 start 命令修改为：**nodemon --exec babel-node ./bin/www**。

### References

1. [Sequelize](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
2. [Express 中文官网](https://www.expressjs.com.cn/)
