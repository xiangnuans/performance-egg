# performance-egg
技术栈：react（ant-desgin-pro框架） + egg + mysql
从项目需求到部署上线整个项目流程

# 知识点汇总
- react使用[ant-desgin-pro](https://github.com/ant-design/ant-design-pro.git)框架，可以尝试TypeScript版本
- [https://umijs.org/zh/guide/](https://umijs.org/zh/guide/)
- [egg-view-assets](https://github.com/eggjs/egg-view-assets)
- ant-design-pro /src/utils/request请求方式的封装，js方式（对比fetch、axios）
- ant-design-pro /src/utils/request请求方式的封装，typescript方式(包umi-request的使用)
- [egg-ant-design-pro](https://github.com/eggjs/egg-ant-design-pro)
- 登陆，认证session和cookie，参考[https://eggjs.org/zh-cn/core/cookie-and-session.html](https://eggjs.org/zh-cn/core/cookie-and-session.html)
- 部署方式：1. 机器部署 2. docker部署（单独文章记录，待更新）


# 命令（暂时想到的）

1. git常用命令，这里就不提了
2. node命令
```
ps -ef | grep node    // 查看当前运行的node进程
kill pid      // 杀死进程
lsof -i:7001    //查看端口运行状态
```
3. docker构建
```
1. docker login registry.cn-hangzhou.aliyuncs.com -u XXX -p XXX       // 我自己的阿里镜像仓库

2. docker build --cache-from registry.cn-hangzhou.aliyuncs.com/coco/performance-node:latest -t registry.cn-hangzhou.aliyuncs.com/coco/performance-node:1.0.0 --tagregistry.cn-hangzhou.aliyuncs.com/coco/performance-node:latest .     // coco仓库名称

3. docker push registry.cn-hangzhou.aliyuncs.com/coco/performance-node:1.0.0
```

4. kubernets部署
```
cat env.yml | sed "s/{{NAMESPACE}}/member-test/g;s/{{APP_NAME}}/$PACKAGE_NAME/g" | kubectl apply -f -    // namespace-kubernets的命名空间， 

- cat deployment-dev.yml | sed "s/{{CI_COMMIT_SHA}}/$CI_COMMIT_SHA/g;s/{{NAMESPACE}}/member-test/g;s/{{ENV}}/dev/g;s/{{APP_NAME}}/$PACKAGE_NAME/g;" | kubectl apply -f -     // CI_COMMIT_SHA- 镜像标签
```


# 坑点

1. 生成的public文件拷贝到egg服务的/app目录下，启动egg服务，页面刷新不出来（问题不确定）
项目开始采用的是前后端服务分离的方式，开发完成，组长希望将前端打包成静态资源部署在egg服务，直接将
```
yarn build
```
在寻找解决问题的时候，官方目前已有示例[egg-ant-design-pro](https://github.com/eggjs/egg-ant-design-pro)，由于时间问题，改了方案直接将前端代码放在了egg服务，yarn build生成一个manifest.json的文件在egg服务的/config目录下

2. 访问问题
```
yarn dev
```
后访问localhost:10000,成功访问，但是发现使用的mock数据，并没有掉到后端服务接口（当时脑子有点懵）
原因：assets配置里直接使用的是
```
umi dev
```
启动前端项目，肯定使用mock啊

应该访问localhost:7001 egg服务，还是没成功，😓😓😓，因为路由，就是第3点要说的

3. 路由问题
```
 router.get('*', controller.home.index);
```
原因：这条路由放在了router.js的最前面，所有请求7001的接口到被这条路由接管了，
将这条路由放在最后，再刷新页面还是没成功

4. 没招了，不知道原因，然后git clone 了egg-ant-design-pro，搞了个简单的[demo](https://github.com/CoCoyh/egg-ant-deploy)测试，很顺利
的访问到egg服务的接口，把示例的web放在了项目中，与之前同样的问题，不可以访问，到这里，至少可以排除不是前端打包的问题，是egg服务的问题，那只能是middleware了，注释掉，再次刷新成功了，两个中间件都很简单的，最后定位到是response-format的问题（原因尚未确定），暂时去掉好了

5. 部署问题：（在centos机器上部署）
```
tar cvf egg-ant-deploy.tar egg-ant-deploy/  // 打包
tar xvf FileName.tar  //解压
```
本地打包好.tar文件
scp到远程centos机器上
将文件夹解压，启动
```
yarn dev
```
1） 访问：机器IP地址:7001访问不到，上网找了很多资料

[127.0.0.1 vs 0.0.0.0](https://www.crifan.com/server_start_up_listen_ip_choice_127_0_0_1_vs_0_0_0_0/)
按文章的方式修改/etc/hosts文件，重新启动服务，访问成功

2）但是静态资源访问不到
