# node-sorry

`sorry有钱真的可以为所欲为`

## 说明

思路参考[sorry](https://github.com/xtyxtyx/sorry)，目前已有[Ruby](https://github.com/xtyxtyx/sorry)、[Python](https://github.com/East196/sorrypy)、[Java](https://github.com/li24361/sorryJava)，目前比较火的nodejs当然不能缺席！

node-sorry 使用的技术栈：
1、nodejs 8.1 + express 4 + ejs
2、Express Generator

`sorry客户真的可以为所欲为`样例：

![](public/cache/sorry-c208aced3e7f9a28cffe2af47843e64d.gif)



## 目录结构

```
├─bin
│  │
│  └─www                     //是应用的主入口
│
├─controller                 // 后端Contoller
│  │  
│  └─render.js               // 核心代码，用ffmpeg生成gif图
│ 
├─node_modules               // 依赖
│
├─public                     // 静态资源
│  │
│  ├─cache                   //gif输出目录
│  │
│  ├─images                  //图片
│  │
│  ├─javascripts             //js
│  │
│  ├─stylesheets             //css样式
│  │
│  └─templates               //gif模板
│
├─routes                     // 路由目录
│  │
│  └─index.js                // 路由文件
│
├─views                      // 视图模板
│  │
│  ├─sorry                   // sorry html
│  │
│  ├─wangjingze              // swangjingze  html
│  │
│  └─404.html                // 404页面
│
├─app.js                     // 主要配置文件
│
├─ffmpeg.exe                 // 方便window用户使用，linux请安装
│
└─pageage.json
   
   
```



## 准备工作:
安装 NodeJS（请按照node8以上）:
https://nodejs.org/zh-cn/

安装yarn（可选）
``` nodejs
npm install -g yarn
``` 

安装cnpm（可选）
``` nodejs
npm install -g cnpm --registry=https://registry.npm.taobao.org
``` 

## 部署
```shell
# 安装依赖
$ npm install //或 yarn install 或 cnpm install

# 启动
$ npm run start
```
浏览器打开[http://localhost:3000/](http://localhost:3000/)


## 服务器部署

### CentOS7下ffmpeg安装
```
wget https://ffmpeg.org/releases/ffmpeg-3.4.2.tar.bz2
yum -y install bzip2
yum -y install yasm
yum -y install libass libass-devel
tar -xf ffmpeg-3.4.2.tar.bz2
cd ffmpeg-3.4.2
./configure --enable-libass
make
make install
```
安装完成后，输入命令ffmpeg检查是否成功

特别注意：此时生成的gif文字会乱码，因为CentOS7缺少中文字体
[安装字体](https://blog.csdn.net/wlwlwlwl015/article/details/51482065)

### CentOS7下yum安装node8
首先用node -v检查是否安装或者版本过低
 卸载
```
sudo yum -y remove nodejs
```
安装
```
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
```

# 适配新Gif
目前，想要适配新的gif,需要改动3个文件（修改前建议备份）
```
public/templates/sorry/index.html
public/templates/sorry/template.mp4
public/templates/sorry/template.ejs
```
其中
```
index.html  按照句子的多少删掉或者增加<input>即可
template.mp4   替换成新视频
template.ejs   替换成新的字幕模板
```

### 字幕模板template.ejs
首先使用aegisub为模板视频创建字幕，保存为sorry.template.ass

>[aegisub教程](https://tieba.baidu.com/p/1360405931)

![图片](https://dn-coding-net-production-pp.qbox.me/56a213df-9ff7-41e0-9b6c-96b1f0fe2cb6.png)

然后把文本替换成模板字符串 ```{{ sentences[n] }}``` 懒得换图了哈，以这个字符串为准

![图片](https://dn-coding-net-production-pp.qbox.me/6b07bc65-c3d7-4251-aad2-bd7b05af9102.png)

最后保存为template.ejs

现在这个网站就可以制作新的gif了