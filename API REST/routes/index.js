const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getProductsByCat, searchProducts, searchProductsByName, filterProducts, getCategories } = require('../controllers/globalController');

router.get('/api/categoria/:id', getProductsByCat);
router.get('/api/categoria/:id/buscar/:search', searchProducts);
router.get('/api/categoria/:id/filter', filterProducts);
router.get('/api/categorias', getCategories);
router.get('/api/search/:search', searchProductsByName);
app.use('/', router);

module.exports = app;