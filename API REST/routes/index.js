const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getProductsByCat, searchProductsByName, filterProducts, filterSearch, getCategories } = require('../controllers/globalController');

router.get('/api/categoria/:id', getProductsByCat);
router.post('/api/categoria/:id/filter/:filter', filterProducts);
router.get('/api/categorias', getCategories);
router.get('/api/search/:search', searchProductsByName);
router.get('/api/search/:search/filter/:filter', filterSearch);
app.use('/', router);

module.exports = app;