const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");

async function getAllProducts() {
    return await ProductModel.find().populate("categories").exec();
}

async function getOneProduct(productId) {
    const product = await ProductModel.findById(productId).populate("categories").exec();
    return product;
}

async function editProduct(product, image) {

    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.name + extension;
        product.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        image.mv(absolutePath);
    }
    
    const result = await ProductModel.updateOne({ _id: product._id }, product).exec();

    if (result.matchedCount === 0) {
        return null;
    } else {
        if (result.modifiedCount === 0) {
            // Do nothing
        }

        return product;
    }
}

async function addProduct(product, image) {

    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product._id + extension;
        product.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath);
    }

    product.save();
    return product;
}

function getProductImage(imageName) {
    let absolutePath = path.join(__dirname, "..", "images", "products", imageName);

    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
    }

    return absolutePath;
}

async function deleteProduct(_id) {
    const result = await ProductModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1 ? true : false;
}

module.exports = {
    getOneProduct,
    addProduct,
    getAllProducts,
    editProduct,
    getProductImage,
    deleteProduct
}