const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.get('/products', async (req, res) => {
    const product_list = await Product.find({});
    const product_count = await Product.find({}).countDocuments();
    res.render('products', {
        product_list,
        product_count
    });
    // res.send(product_list);
});

router.get('/product', async (req, res) => {
    try {
        product = await Product.findById(req.query.id);
        res.render('product_page', {product});
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;