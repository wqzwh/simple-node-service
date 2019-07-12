# 简易后端服务搭建

## 简易流程

<img src="https://raw.githubusercontent.com/wqzwh/simple-node-service/master/lct.png" width="700" />

## 实现

- [原生实现](https://github.com/wqzwh/node-backend/tree/master/server-native)
- [express 实现](https://github.com/wqzwh/node-backend/tree/master/server-express)
- [koa2 实现](https://github.com/wqzwh/node-backend/tree/master/server-koa2)

## 运行说明

本项目使用的数据库是 mysql 和 redis，所以必须保证 mysql 和 redis 本地运行了才能执行下面命令

```
npm run dev
```

## JWT 相关

<img src="https://raw.githubusercontent.com/wqzwh/simple-node-service/master/jwt.png" width="500" />

express 版本使用插件

```
npm i jsonwebtoken express-jwt -S
```

## GraphQL 相关

基本目录结构如下：

```
├── blog
│   ├── model.js
│   ├── mutation.js
│   └── query.js
├── schema.js
└── user
    ├── model.js
    ├── mutation.js
    └── query.js
```

- 运行命令

```
cd server-express

npm run dev
```

直接访问 http://localhost:3000/graphql 查看 GraphQL 可视化编辑界面

> 本项目使用 mysql，数据库字段内容需另外添加

实现以下测试接口

```
query {
  items: Blog {
    id,
    title,
    content,
    createtime,
    author
  }
  item: BlogItem(author:"澎湃新闻") {
    title
  }
}

# mutation {
#   item: BlogCreate(data:{
#     author: "123",
#     content: "asdadad",
#     title: "adadadad"
#   }) {
#     id
#   }
# }

# mutation {
#   BlogDel(id: 8, author: "123")
# }

# mutation {
#   UserLogin(data:{
#     username: "lisi",
#     password: "123"
#   })
# }
```
