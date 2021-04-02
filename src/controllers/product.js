const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');

const addToCart = async (query) => {
    return new Promise(async (resolve, reject) => {
        const product = await Product.findOne({_id: query.poduct_id});
        // TODO: To complete addToCart
    });
}

module.export = {
    addToCart
}