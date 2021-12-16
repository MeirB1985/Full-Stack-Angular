const mongoose = require("mongoose");

const ItemScheme = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId
    },
    quantity: {
        type: Number,
        required: [true]
    },
    price: {
        type: Number,
        required: [true]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId
    },
    imageName: String,
}, { versionKey: false, toJSON: {virtuals: true}});

ItemScheme.virtual("products", {
    localField: "product",
    ref: "ProductModel",
    foreignField: "_id"
});
ItemScheme.virtual("carts", {
    localField: "cart",
    ref: "CartModel",
    foreignField: "_id"
});

const ItemModel = mongoose.model("ItemModel", ItemScheme, "items");

module.exports = ItemModel;