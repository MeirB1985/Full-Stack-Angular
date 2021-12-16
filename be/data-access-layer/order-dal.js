const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

const OrderModel = require("../models/order-model");
const CategoryModel = require("../models/category-model");

async function getAllOrders() {
    return await OrderModel.find().populate("carts").exec();
}

async function getAllUserOrders(userId) {
    return await OrderModel.find({user: userId}).populate("carts").exec();
}

async function getAllBookedDates() {
    const uniqueDates = await OrderModel.aggregate([{"$group" : {_id:"$shippingDate", cnt:{$sum:1}}}]);
    const bookedDates = uniqueDates.filter(o => o.cnt > 2);
    return bookedDates;
}

async function getOneOrder(orderId) {
    const order = await OrderModel.findById(orderId).populate("carts").exec();
    return order;
}


async function addOrder(order) {
    order.save();
    return order;
}

function getOrderReceipt(orderId) {
    let absolutePath = path.join(__dirname, "..", "database/orders", "orders", orderId);
    
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "database/orders", "receipt-not-found.jpg");
    }

    return absolutePath;
}

module.exports = {
    getOneOrder,
    addOrder,
    getAllOrders,
    getAllUserOrders,
    getAllBookedDates,
    getOrderReceipt
}