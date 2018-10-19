//引入express
var express = require('express');
var app = express();

//引入cookie和session
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
    secret: '12345',
    saveUninitialized: true, //添加 saveUninitialized 选项
    resave: false, //添加 resave 选项
    name: 'express_11_cookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80*1000 },     //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}));

var path = require('path');//引入path路径模块

var ejs = require('ejs');//引入的ejs插件

//设置视图地址
app.set('views', path.join(__dirname, '/views'));

//设置html引擎
app.set('view engine', 'html');
app.engine('html', ejs.__express);

//静态文件中间件
app.use(express.static('public'));

//引入body-parser模块
var bodyParser = require('body-parser');
//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//注册
var accountControllers = require('./Controllers/accountControllers');
app.get('/contact',accountControllers.contact);
app.post('/account',urlencodedParser,accountControllers.account);


//登录
var indexController=require('./Controllers/IndexController');
app.get('/index',indexController.index);
app.post('/login',urlencodedParser,indexController.login);


app.get('/location',function(req,res){
    res.render('location',{});
});

app.get('/404',function(req,res){
    res.render('404',{});
});

app.get('/specials',function(req,res){
    res.render('specials',{});
});

app.get('/login',function(req,res){
    res.render('login',{});
});

app.get('/account',function(req,res){
    res.render('account',{});
});

app.get('/checkout',function(req,res){
    res.render('checkout',{});
});

app.get('/contact',function(req,res){
    res.render('contact',{});
});

app.get('/single',function(req,res){
    res.render('single',{});
});

app.listen(8888,function(){
    console.log("主服务器启动成功！");
});