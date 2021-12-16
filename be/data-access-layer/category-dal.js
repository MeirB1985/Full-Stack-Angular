const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

const CategoryModel = require("../models/category-model");

function getAllCategories() {
    return CategoryModel.find().populate("products").exec();
}

async function getOneCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId).populate("products").exec();
    return category;
}

async function addCategory(category) {
    category.save();
    return category;
}

async function deleteCategory(_id) {
    const result = await CategoryModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1 ? true : false;
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    getOneCategory
}
