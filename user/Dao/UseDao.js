function UseDao(){
    this.init=function(){
        var mysql  = require('mysql');  //调用MySQL模块

//1，创建一个connection
    this.connection = mysql.createConnection({
        host     : 'localhost',       //主机 ip
        user     : 'root',            //MySQL认证用户名
        password : '1996',                //MySQL认证用户密码
        port: '3306',                 //端口号
        database:'express'          //数据库里面的数据
    });
//2,连接
    this.connection.connect();
}
    this.selectUserByName=function(username,call){
//3,编写sql语句
    var  sql = "SELECT pwd FROM user where username='"+username+"'";
//4,进行查询操作
    /**
     *query，mysql语句执行的方法
     * 1，userAddSql编写的sql语句
     * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
     */
    this.connection.query(sql,function (err, result) {
        if(err){
            console.log('[select ERROR] - ',err.message);
            return;
        }
        // console.log(result);
        call(result);
    });
}
        this.insertUser = function(nickname,username,email,pwd,call){
            //(1)执行插入
            var  sqlInsert = 'INSERT INTO user(nickname,username,email,pwd) VALUES(?,?,?,?)';
            var  paramsInsert = [nickname,username,email,pwd];

            this.connection.query(sqlInsert,paramsInsert,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }

               call(result);
        });
    }
}
module.exports=UseDao;