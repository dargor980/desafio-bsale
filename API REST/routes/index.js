const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getProductsByCat, searchProducts, filterProducts, getCategories } = require('../controllers/globalController');

router.get('/categoria/:id', getProductsByCat);
router.get('/categoria/:id/buscar/:search', searchProducts);
router.get('/categoria/:id/filter', filterProducts);
router.get('/categorias', getCategories);
app.use('/', router);

module.exports = app;