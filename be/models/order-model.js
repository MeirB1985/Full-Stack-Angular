const mongoose = require("mongoose");

const OrderScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId
    },
    price: {
        type: Number,
        required: [true]
    },
    city: {
        type: String,
        required: [true]
    },
    st: {
        type: String,
        required: [true]
    },
    shippingDate: {
        type: String,
        required: [true]
    },
    orderDate: {
        type: String,
        required: [true]
    },
    card: {
        type: String,
        required: [true]
    },
}, { versionKey: false, toJSON: {virtuals: true}});

OrderScheme.virtual("users", {
    ref: "UserModel",
    localField: "user",
    foreignField: "_id",
    justOne: true
});
OrderScheme.virtual("carts", {
    ref: "CartModel",
    localField: "cart",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderScheme, "orders");

module.exports = OrderModel;