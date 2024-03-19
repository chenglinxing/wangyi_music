#### 1.项目框架搭建

react18 、 react-router、axios、antd、normalize.css、styled-components、craco

```
normalize.css     初始化样式                   安装： npm i normalize.css
styled-components 使用标签模板来对组件进行样式化   安装： npm i styled-components
craco             配置webpack                 安装： npm install --save @craco/craco
安装后需要修改package.json里面的属性
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
},

```



#### 2.项目初始化

1. 路由的配置及renderRoutes的应用

   ![image-20240319153600965](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20240319153600965.png)

2. 封装网络请求

3. 