const express = require('express');
const chalk = require('chalk');
const AuthMiddleware = require('../middleware/auth');
const ProductController = require('../controllers/product');
const ShippingController = require('../controllers/shipping');
const router = new express.Router();

router.get('/shipinfo', AuthMiddleware, async(req, res) => {
    ProductController.getOrder(req.user)
        .then((resp) => {
            if (resp.order_exists == false) {
                // TODO: If cart is empty.
                // TODO: End route here
            }
            res.render('shipinfo', {
                order: resp.order,
                products: resp.products,
                cart_total: resp.cart_total
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/shipinfo', AuthMiddleware, async(req, res) => {
    // TODO: Adding coupon code route and method
    ShippingController.saveShipInfo(req.user, req.body)
        .then((resp) => {
            res.redirect('/shipping');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        })
});

router.get('/shipping', (req, res) => {
    res.render('shipping', {

    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {

    });
});

module.exports = router;