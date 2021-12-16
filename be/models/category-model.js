const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String,
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CategorySchema.virtual("products", {
    localField: "_id",
    ref: "ProductModel",
    foreignField: "category",
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;
