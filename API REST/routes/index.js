const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();

const { getProductsByCat, searchProducts } = require('../controllers/globalController');

router.get('/categoria/:id', getProductsByCat);
router.get('/categoria/:id/buscar/:search', searchProducts);
app.use('/', router);

module.exports = app;