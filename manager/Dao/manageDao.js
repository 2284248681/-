function manageDao(){
    this.init = function () {
        var mysql = require('mysql');

        this.connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'1996',
            port:'3306',
            database:'express'
        });

        this.connection.connect();
    }

    this.selectUser = function (call) {
        var sqlwords = 'select * from user';

        this.connection.query(sqlwords,function(err,result){
            if (err){
                console.log('[INSERT ERROR] -',err.message);
            }else {
                console.log("mysql连接成功")
            }

            call(result);

        });

        this.connection.end();
    }
}

module.exports = manageDao;