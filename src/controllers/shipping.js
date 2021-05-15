const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');
const { resolve } = require('path');

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

const getShippingInfo = async(user) => {
    return new Promise(async(resolve, reject) => {
        try {
            const order = user.orders.slice(-1)[0];
            var shipping_info = user.shipping.slice(-1)[0].shipping_info;
            const full_address = shipping_info.address + ", " + shipping_info.city + ", " + shipping_info.state + ", " + shipping_info.country;
            resolve({ shipping_info, full_address, order });
        } catch (e) {
            reject(e);
        }
    });
}

const savePaymentMethod = async(user, paymentMethod) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (paymentMethod.cod == 'true') {
                var l = user.orders.length;
                user.orders[l - 1].payment_type = 'COD';
                await user.save();
            } else {
                var l = user.orders.length;
                user.orders[l - 1].payment_type = 'ONLINE';
                await user.save();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    saveShipInfo,
    getShippingInfo,
    savePaymentMethod,

}