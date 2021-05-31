const chalk = require('chalk');
const User = require('../models/user');
const Product = require('../models/product');

const getAllOrders = async(user) => {
    return new Promise(async(resolve, reject) => {
        try {
            order_summary = [];
            user.orders.forEach(order => {
                var summary = {
                    id: order._id,
                    total: order.net_total,
                    shipping: order.shipping_address || 'nil',
                    payment: order.payment_type,
                    status: order.payment_completed ? 'COMPLETED' : 'INCOMPLETE'
                }
                order_summary.push(summary);
            });
            resolve(order_summary);
        } catch (e) {
            reject(e);
        }
    });
}

const getSpecificOrder = async(user, orderID) => {
    return new Promise(async(resolve, reject) => {
        try {
            await user.populate('orders.cart.product').execPopulate();
            orders = user.orders;
            var order = undefined;
            orders.forEach(user_order => {
                if (user_order._id == orderID) {
                    order = user_order;
                    return;
                }
            });
            if (order == undefined) {
                reject('No Order');
            }
            resolve(order);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllOrders,
    getSpecificOrder,

}