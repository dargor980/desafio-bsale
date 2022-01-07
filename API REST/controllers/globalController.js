const { json } = require('express/lib/response');
const mysql = require('mysql');
const con = require('./db');

const getProductsByCat = async (req, res) => {
    try{
        con.connect(function(err){
            if(err) console.log(err);
            console.log("Connected !");
            con.query("SELECT *FROM product WHERE category = " + mysql.escape(req.params.id) + " ORDER BY name DESC", function(err, result){
                if(err) throw err;
                let data = JSON.stringify(result);
                console.log(data);
                res.status(200).json({
                    message: 'OK',
                    data: data
                });
            });
        });
    }
    catch {
        res.status(505).json({
            message: 'Internal Server Error'
        });
    }
}

const searchProducts = async (req, res) => {
    con.connect(function (err) {
        if(err){
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query("SELECT * FROM product WHERE name LIKE  " + mysql.escape("%" + req.params.search+ "%") + " AND category = " + mysql.escape(req.params.id) + " ORDER BY name DESC", function (err, result){
            if(err) throw err;
            let data = JSON.stringify(result);
            res.status(200).json({
                message: 'OK',
                data: data
            });
        });
    });
}





module.exports = {
    getProductsByCat,
    searchProducts,

}