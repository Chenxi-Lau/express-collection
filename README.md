<!--
 * @Author: 刘晨曦 <lcxcsy@126.com>
 * @Date: 2021-03-18 10:04:42
 * @LastEditTime: 2021-09-07 10:02:05
 * @LastEditors: Please set LastEditors
 * @Description: README
 * @FilePath: \node-jwt-demo\express-based\README.md
-->

# Express-Collection

> Express 技术栈，整合一些相关项目。

[Express 中文官网](https://www.expressjs.com.cn/)

main 分支为通过 express-generator 生成的原始项目，仅做了目录结构和部分代码调整。

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

#### :document 目录结构变动：

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

#### 支持 import/export

项目通过安装 babel-core、babel-preset-env 支持 import/export 语法。

```json
{
  "presets": ["env"]
}
```

package.json 中 start 命令修改为了 babel-node ./bin/www

#### 支持数据库连接

主目录下新建 models/users.js，通过 define()将数据库的表结构映射到对象上，

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

## References

1. [使用 Sequelize](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
2. [使用 koa2 实现一个简单 JWT 鉴权](https://www.jianshu.com/p/34cc51f4ad51)
