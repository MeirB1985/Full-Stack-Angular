const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

const ItemModel = require("../models/item-model");

async function getAllItems(cartId) {
    const items = await ItemModel.find({cart: cartId}).populate('carts').populate('products').exec();
    return items;
}

async function getOneItem(itemId) {
    const item = await ItemModel.findById(itemId).populate('products').populate('carts').exec();
    return item;
}

async function updateItem(item, image) {

    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = item._id + extension;
        item.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "items", fileName);
        image.mv(absolutePath);
    }
    
    const result = await ItemModel.updateOne({ _id: item._id }, item).exec();

    if (result.matchedCount === 0) {
        return null;
    } else {
        if (result.modifiedCount === 0) {
            // Do nothing
        }

        return item;
    }
}

async function patchItem(itemId, changes, image) {

    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = itemId + extension;
        changes.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "items", fileName);
        image.mv(absolutePath);
    }

    const updatedItem = await ItemModel.updateOne({_id: itemId}, {$set: changes}).exec();
    return updatedItem;
}

async function addItem(item) {
    item.save();
    return item;
}

function getItemImage(imageName) {
    let absolutePath = path.join(__dirname, "..", "images", "items", imageName);

    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
    }

    return absolutePath;
}

async function deleteItem(_id) {
    const result = await ItemModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1 ? true : false;
}

async function deleteAll() {
    const result = await ItemModel.deleteMany({}).exec();
    return result;
}

module.exports = {
    getOneItem,
    addItem,
    getAllItems,
    updateItem,
    getItemImage,
    deleteItem,
    patchItem,
    deleteAll
}