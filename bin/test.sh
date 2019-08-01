#!/bin/sh

node -v
# 安装所有依赖
yarn install
# 代码风格审查
npm run lint
# 执行测试
npm run test
# 启动服务
npm run dev
