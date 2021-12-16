const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
    admin: {
        type: Boolean,
        required: [true],
        default: false
    },
    firstName: {
        type: String,
        required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    },
    email: {
        unique: [true, "email must be unique"],
        type: String,
        required: [true]
    },
    id: {
        type: String,
        required: [true],
        minlength: [9],
        maxlength: [9]
    },
    password: {
        type: String,
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
}, { versionKey: false, toJSON: {virtuals: true}});

UserScheme.virtual("carts", {
    localField: "_id",
    ref: "CartModel",
    foreignField: "user"
});
UserScheme.virtual("orders", {
    localField: "_id",
    ref: "OrderModel",
    foreignField: "user"
});

const UserModel = mongoose.model("UserModel", UserScheme, "users");

module.exports = UserModel;