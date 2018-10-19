function UseService(){

    this.init=function(){
        //(1)引入userDao模块
        var UseDao =  require('../Dao/UseDao');
        //(2)创建对象
        this.useDao =  new UseDao();
        //(3)对象初始化
        this.useDao.init();
    }

    this.insert = function(nickname,username,email,pwd,call){
    var resData={
        insertId:-1,
        msg:''
    }

    var username=this.crypto(username);
    var pwd=this.crypto(pwd);

    var that = this;
        this.checkUser(username,function(result){
             if(result){
                 resData.msg="用户已经存在！"
                 call(resData);
             }else{
                 that.useDao.insertUser(nickname,username,email,pwd,function (data) {
                     resData.msg="注册成功";
                     resData.insertId=data.insertId;

                     call(resData);

                 })
             }

        })
    }
    this.selectUserByName=function(username,call){
        //(1)查询用户数据
        this.useDao.selectUserByName(username,function(result){

            call(result);
        })
    }
    this.checkUser=function(username,call){
       this.selectUserByName(username,function(result){
           if(result.length==0){
               call(false);
           }else{
               call(true);
           }
       });
    }

     
    this.crypto=function(data){
        var crypto = require('crypto');
        //2，生成口令的散列值，crypto模块功能是加密并生成各种散列，createHash(algorithm)方法 ,这是利用给定的算法生成hash对象
        var md5 = crypto.createHash('md5');
        //3,digest([encoding])方法，计算数据的hash摘要值，encoding是可选参数，不传则返回buffer (encoding可为 'hex'、'base64'等)；
        var buffer = md5.update(data).digest('hex');
        return buffer;
    }
}
module.exports=UseService;