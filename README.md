# node-backend

## 1、原生实现

### 代码目录简要介绍(server-1)

- bin/www.js 项目启动
- src/conf 项目基本配置（mysql/redis 配置）
- src/controller 模块控制器逻辑（根据 sql 输出 mysql 中的数据）
- src/db 数据库/redis 数据库连接逻辑
- src/model 定义返回数据的基本类，保证数据返回格式统一
- src/router 模块路由逻辑
- src/app.js 项目入口文件
