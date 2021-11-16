module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getWines(res, mysql, context, complete){
        mysql.pool.query("SELECT bottleID, brand, type, year, price, inventoryAmount, status FROM Wines", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wines = results;
            complete();
        });
    };    

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getWines(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('wines', context);
            }

        }
    });

    return router;
}();