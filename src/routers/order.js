const express = require('express');
const chalk = require('chalk');
const router = new express.Router();
const AuthMiddleware = require('../middleware/auth');
const OrderController = require('../controllers/order');

router.get('/orders', AuthMiddleware, (req, res) => {
    OrderController.getAllOrders(req.user)
        .then((order_summary) => {
            res.render('orders', {
                order_summary
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.get('/completed', AuthMiddleware, (req, res) => {
    OrderController.getSpecificOrder(req.user, req.query.id)
        .then((order) => {
            var status = order.payment_completed ? 'COMPLETED' : 'INCOMPLETE';
            var order_subtotal = order.net_total - order.shipping_cost;
            var user = req.user;
            var shipping = user.shipping[0];
            res.render('order_completed', {
                orderID: req.query.id,
                status,
                cart: order.cart,
                // TODO: Shipping & Billing Address
                // TODO: Add addresses on webpages [orders & completed]
                shipping_address: order.shipping_address,
                billing_address: order.billing_address,
                order_subtotal,
                order_shipping: order.shipping_cost,
                order_total: order.net_total,
                user,
                shipping
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 404
            });
        });
});

// router.get('/invoice', AuthMiddleware, (req, res) => {
//     res.render('invoice', {});
// });


module.exports = router;