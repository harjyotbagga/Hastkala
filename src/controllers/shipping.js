const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');

const saveShipInfo = async(user, info) => {
    return new Promise(async(resolve, reject) => {
        try {
            user.shipping = user.shipping.concat({ shipping_info: info });
            await user.save();
            console.log(chalk.green("User Shipping Info Saved."));
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    saveShipInfo,

}