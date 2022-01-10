const { json } = require('express/lib/response');
const mysql = require('mysql');
const dataConnection = require('./db');

const getProductsByCat = async (req, res) => {
    try {
        let con = mysql.createConnection(dataConnection);
        await con.connect(function (err) {
            if (err) {
                res.send(505).json({
                    message: 'Internal Server Error'
                });

            }
            con.query("SELECT *FROM product WHERE category = " + mysql.escape(req.params.id) + " ORDER BY name DESC", function (err, result) {
                if (err) throw err;
                con.destroy();
                res.status(200).json({
                    message: 'OK',
                    data: result
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


const searchProductsByName = async (req, res) => {
    let con = mysql.createConnection(dataConnection);
    await con.connect(function (err) {
        if (err) {
            con.destroy();
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query("SELECT * FROM product WHERE name LIKE " + mysql.escape("%" + req.params.search + "%") + " ORDER BY name DESC", function (err, result) {
            if (err) {
                con.destroy();
                res.status(505).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json({
                message: 'OK',
                data: result
            });
        });
    });
}

const filterProducts = async (req, res) => {
    let filters = {
        1 : { campo: "name", orden: "ASC" },
        2 : { campo: "name", orden: "DESC" },
        3 : { campo: "price", orden: "ASC"},
        4 : { campo:"price", orden: "DESC"},
        5 : { campo: "discount", orden: "ASC"},
        6 : { campo: "discount", orden: "DESC"}
    }
    let category = req.params.id;
    console.log(category);
    let filter = req.params.filter;
    let atribute = filters[filter].campo;
    let order = filters[filter].orden;
    console.log("ATRIBUTO: " + order);
    let con = mysql.createConnection(dataConnection);
    
    await con.connect(function (err) {
        if (err) {
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query(`SELECT * FROM product where category = ${category} ORDER BY ${atribute} ${order}`, function (err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result));
            res.status(200).json({
                message: 'OK',
                data: result
            });
        });
    });
}

const filterSearch = async (req, res) => {
    let filters = {
        1 : { campo: "name", orden: "ASC" },
        2 : { campo: "name", orden: "DESC" },
        3 : { campo: "price", orden: "ASC"},
        4 : { campo:"price", orden: "DESC"},
        5 : { campo: "discount", orden: "ASC"},
        6 : { campo: "discount", orden: "DESC"}
    }
    let search = req.params.search;
    let filter = req.params.filter;
    let atribute = filters[filter].campo;
    let order = filters[filter].orden;
    let con = mysql.createConnection(dataConnection);
    await con.connect(function (err) {
        if (err) {
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query(``, function (err, result) {
            if (err){
                res.status(505).json({
                    message: 'Internal Server Error'
                });
            }
            con.destroy();
            res.status(200).json({
                message: 'OK',
                data: result
            });
        });
    })
}

const getCategories = async (req, res) => {
    let con = mysql.createConnection(dataConnection);
    await con.connect(function (err) {
        if (err) {

            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query("SELECT * FROM category", function (err, result) {
            if (err) {
                res.status(505).json({
                    message: 'Internal Server Error.'
                });
            }
            con.destroy();
            res.status(200).json({
                message: 'OK',
                data: result
            });

        });
    });
}


module.exports = {
    getProductsByCat,
    filterProducts,
    getCategories,
    searchProductsByName,
    filterSearch
}