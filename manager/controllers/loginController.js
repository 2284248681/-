exports.login=function(req,res){
    // var state = -1;
    if(req.session.sign){
        res.render('login',{state:2});
        return;
    }
    let username =req.cookies.username;
    let pwd=req.cookies.pwd;
    if(username==null||pwd==null){
        res.render('login',{state:-1});
    }else{
        //(1)引入loginService
        let loginService = require('../Service/loginService');
        //(2)创建对象
        let loginservice = new loginService();
        //(3)对象初始化
        loginservice.init();
        //(4)验证用户是否合法
        loginservice.checkUser(username,pwd,function(result){
            if(result.state==2)
            {
                req.session.sign=true;
                res.render('login',{state:2});
            }else{
                res.render('login',{state:-1});
            }
        },1);
    }
}

exports.listes=function(req,res){
    //1,解析客户端提交的数据
    var username  = req.body.username;
    var pwd  = req.body.pwd;
    //2,验证用户是否合法
    //(1)引入userService
    let UserService = require('../Service/loginService');
    //(2)创建对象
    let userService = new UserService();
    //(3)对象初始化
    userService.init();
    //(4)验证用户是否合法
    userService.checkUser(username,pwd,function(result){
        if(result.state==2){
            req.session.sign=true;
            res.cookie('username',result.username, {maxAge:60*60 * 1000});
            res.cookie('pwd',result.pwd, {maxAge:60*60 * 1000});
        }
        result.username=null;
        result.pwd=null;
        res.end(JSON.stringify(result));
    },0);
};