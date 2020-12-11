```
+assets
 -bootstrap
 -jquery
 -jquery-pageination
 -jquery-validation
+css
 -cart.css
 -detail.css
 -index.css
 -list.css
 -login.css
 +js
 -cart.js
 -detail.js
 -index.js
 -list.js
 -login.js
 -public.js
 +sass
 -cart.sass
 -detail.sass
 -index.sass
 -list.sass
 -login.sass
 -public.sass
 +server
 -getCateOne.php
 -getCateTwo.php
 -getCateThree.php
 -getGoodsInfo.php
 -getGoodsList.php
 -getTotalPage.php
 -login.php
 +swiper
 +banner.js
 +cart.html
 +detail.html
 +index.html
 +list.html
 +login.html
 +public.html
 +move.js
 +public.css
```
导入数据库
+ 打开 mysql 可视化工具
  - 新建一个 database 叫做 bk2004
  - 导入 goods.sql 的文件
+  创建表格
  - 新建一个表格, 叫做 user
  - 创建用户信息
    - user_id: 1   username: admin   password: 223322   nickname: guanliyuan
    - user_id: 2   username: wangyan  password: 931117   nickname: wangyan

配置站点域名
- 配置一个站点域名
- www.wangyan.com / wangyan.com

index.html 页面布局 和 功能的实现

- 页面头部
  - 登录按钮,  用户登录信息
  - 二级下拉菜单 插件
- 搜索引擎
  - 使用 百度的数据
  - 根据文本框内容发送 jsonp 请求, 接收后端数据
  - 根据返回的数据渲染页面
- 轮播图区域
  - 左右切换轮播图
  - 进入页面, 开启自动轮播
  - 点击焦点, 可任意切换图片
  - 点击左右按钮, 可向左或向右切换图片
- 列表页按钮 
  - 点击 去购物 按钮, 可跳转 列表 页面

login.html 页面布局 和 功能的实现

- 登录窗口
  - 点击登录按钮, 获取后端数据
    => 进行表单验证
    => 验证通过后, 跳转首页

list.html 页面布局 和 功能的实现

- 筛选区域
  - 通过发送 jsonp 请求, 就收后端数据
  - 根据返回的数据来渲染 筛选信息 分页信息 和 列表信息
  - 点击 一级分类
    => 获取 二级分类 和 列表信息
  - 点击 排序方式
    => 可实现 价格 销量 正序或者倒序的切换
- 分页信息区域
  - 通过后端返回的数据来渲染 分页信息
  - 点击 数字按钮 可切换对应的页面
  - 点击 左右按钮 可切换上一页或下一页
- 列表信息区域
  - 根据后端返回的数据来渲染 列表信息
  - 点击商品名称, 可进入 列表详情
  - 点击 加入购物车按钮, 可将 一件此商品 加入购物车
  - 点击 去结算按钮, 可进入 购物车界面

detail.html 页面布局 和 功能的实现

- 渲染页面
  - 通过后端返回的数据
  - 渲染商品详细信息
  - 商品图片
  - 商品描述
  - 商品价格
  - 商品详细信息
- 放大镜效果
  - 将鼠标移动至大图区域
  - 右侧处出现放大效果图
  - 通过鼠标移动在大图区域的移动
  - 控制放大镜盒子背景图片的移动范围
- 添加商品数量文本框
  - 可通过手动输入所需商品数量
  - 也可以通过 '+' '-' 来增加或减少商品数量
- 加入购物车
  - 点击加入购物车按钮
  - 可添加对应文本框的 该商品的数量

cart.html 页面布局 和 功能的实现

- 无商品
  - 可点击 现在去选购按钮, 进入 商品列表页面
- 有商品
  - 点击选项框, 选择需要结算的商品
  - 会计算出所有商品的数量, 及商品的价格
  - 点击 删除 按钮
  - 可删除该商品
