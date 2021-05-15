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

// TODO: Make right column as a partial

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

router.get('/shipping', AuthMiddleware, async(req, res) => {
    const user = req.user;
    ShippingController.getShippingInfo(req.user)
        .then(({ shipping_info, full_address, order }) => {
            res.render('shipping', {
                user,
                full_address,
                order
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/shipping', AuthMiddleware, async(req, res) => {
    ShippingController.savePaymentMethod(req.user, req.body)
        .then(() => {
            res.redirect('/payment');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.get('/payment', AuthMiddleware, (req, res) => {
    const user = req.user;
    ShippingController.getShippingInfo(req.user)
        .then(({ shipping_info, full_address, order }) => {
            res.render('payment', {
                user,
                full_address,
                order
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

module.exports = router;