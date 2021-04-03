const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');

const addToCart = async (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = query.user;
            const product = await Product.findOne({_id: query.product_id});
            const qty = query.qty;
            var productAdded = false;
            user.cart.forEach((item) => {
                if (item.product == product._id.toString()) {
                    item.qty += 1;
                    productAdded=true;
                    return;
                }
            });
            if (!productAdded) {
                user.cart = user.cart.concat({product, qty});
            }
            await user.save();
            console.log(chalk.green("PRODUCT ADDED TO CART!"));
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

const getCart = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            await user.populate('cart.product').execPopulate();
            const products = user.cart;
            var cart_total = 0
            products.forEach((product) => {
                var net_price = product.product.price * product.qty;
                product.net_price = net_price;
                cart_total += net_price;
            });
            resolve({products, cart_total});  
        } catch (e) {
            reject(e);
        }
    });
}


module.exports = {
    addToCart,
    getCart,
}