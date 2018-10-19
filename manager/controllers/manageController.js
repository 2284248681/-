exports.manage = function (req,res) {
    var manageDao = require("../dao/manageDao");
    var managedao = new manageDao();

    managedao.init();
    managedao.selectUser(function(result){
        res.render('manage',{user:result});
    });

}