const path = require("path");
require("./mongodb-access");

const CartModel = require("../models/cart-model");

async function getAllCarts(userId) {
    return await CartModel.find({user: userId}).populate("users").exec();
}

async function getOneCart(cartId) {
    const cart = await CartModel.findById(cartId).populate("users").exec();
    return cart;
}

async function addCart(cart) {
    cart.save();
    return cart;
}

async function deleteCart(_id) {
    const result = await CartModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1 ? true : false;
}

module.exports = {
    getOneCart,
    addCart,
    getAllCarts,
    deleteCart
}