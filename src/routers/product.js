const express = require('express');
const router = new express.Router();
const Product = require('../models/product');
const AuthMiddleware = require('../middleware/auth');
const chalk = require('chalk');

router.get('/products', async(req, res) => {
    try {
        const product_list = await Product.find({});
        const product_count = await Product.find({}).countDocuments();
        res.render('products', {
            product_list,
            product_count
        });
        // res.send(product_list);
    } catch (e) {
        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 500
        });
    }
});

router.get('/product', async(req, res) => {
    try {
        product = await Product.findById(req.query.id);
        if (!product) {
            res.render('error', {
                error_code: 404
            });
        }
        res.render('product_page', { product });
    } catch (e) {
        console.log(chalk.red(`ERROR: ${e}`));
        res.render('error', {
            error_code: 404
        });
    }
});

router.post('/product', AuthMiddleware, async(req, res) => {
    product = await Product.findById(req.body.product_id);
    if (!product) {
        res.render('error', {
            error_code: 404
        });
    }
    // TODO: To change & complete route
    res.send();
});

module.exports = router;