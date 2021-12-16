const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minlength: [2, "Name must be at least 2 characters long."],
        maxlength: [100, "Name cannot exceed 100 characters."]
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [0, "Price must be a positive number."],
        max: [10000, "Price cannot exceed 10000."]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId
    },
    imageName: String,
    }, 
    { versionKey: false, toJSON: {virtuals: true}});

ProductSchema.virtual("categories", {
    ref: "CategoryModel",
    localField: "category",
    foreignField: "_id",
    justOne: true
});
ProductSchema.virtual("items", {
    ref: "ItemModel",
    localField: "_id",
    foreignField: "product",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;