const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getProductsByCat, searchProducts, filterProducts } = require('../controllers/globalController');

router.get('/categoria/:id', getProductsByCat);
router.get('/categoria/:id/buscar/:search', searchProducts);
router.get('/categoria/:id/filter', filterProducts);
app.use('/', router);

module.exports = app;