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

const searchProducts = async (req, res) => {
    let con = mysql.createConnection(dataConnection);
    await con.connect(function (err) {
        if (err) {
            con.destroy();
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query("SELECT * FROM product WHERE name LIKE  " + mysql.escape("%" + req.params.search + "%") + " AND category = " + mysql.escape(req.params.id) + " ORDER BY name DESC", function (err, result) {
            if (err) throw err;
            con.destroy();
            res.status(200).json({
                message: 'OK',
                data: result
            });
        });
    });
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

    let filters = req.body;
    let con = mysql.createConnection(dataConnection);
    await con.connect(function (err) {
        if (err) {
            res.status(505).json({
                message: 'Internal Server Error'
            });
        }
        con.query("", function (err, result) {
            if (err) throw err;
            res.status(200).json({
                message: 'OK',
                data: result
            });
        });
    });
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
    searchProducts,
    filterProducts,
    getCategories,
    searchProductsByName
}