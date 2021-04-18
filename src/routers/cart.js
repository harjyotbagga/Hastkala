const express = require('express');
const chalk = require('chalk');
const AuthMiddleware = require('../middleware/auth');
const ProductController = require('../controllers/product');
const router = new express.Router();

router.get('/cart', AuthMiddleware, async (req, res) => {
    ProductController.getCart(req.user)
        .then(({products, cart_total}) => {
            res.render('cart', {
                products,
                cart_total
            });
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/add_to_cart', AuthMiddleware, async (req, res) => {
    // FIXME: If BUY button is pressed.
    console.log(req.body);
    ProductController.addToCart({
        'user': req.user,
        'product_id': req.body.product_id,
        'qty': req.body.product_qty
    })
        .then((resp) => {
            res.redirect('/cart');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/remove_from_cart', AuthMiddleware, async (req, res) => {
    ProductController.removeFromCart({
        'user': req.user,
        'product_id': req.body.product_id,
        'qty': req.body.product_qty
    })
        .then((resp) => {
            res.redirect('/cart');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        });
});

router.post('/checkout_cart', AuthMiddleware, async (req, res) => {
    ProductController.checkoutCart(req.user)
        .then((resp) => {
            // TODO: Empty cart also.
            res.redirect('/shipinfo');
        })
        .catch((e) => {
            console.log(chalk.red(`ERROR: ${e}`));
            res.render('error', {
                error_code: 500
            });
        })
});

router.get('/shipinfo', AuthMiddleware, async (req, res) => {
    ProductController.getOrder(req.user)
        .then((resp) => {
            if (resp.order_exists==false) {
                // TODO: If cart is empty.
                // TODO: End route here
            }
            console.log(resp);
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

router.get('/shipping', (req, res) => {
    res.render('shipping', {
        
    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        
    });
});


module.exports = router;