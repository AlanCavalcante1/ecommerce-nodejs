const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);
router.post('/admin/category', categoryController.create_category);
router.post('/admin/product', productController.create_product);
router.get('/admin/products/:productId', productController.show_product);

module.exports = router;