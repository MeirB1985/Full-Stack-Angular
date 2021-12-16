const mongoose = require("mongoose");

const CartScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: String,
        required: [true]
    },
}, { versionKey: false, toJSON: {virtuals: true}});

CartScheme.virtual("users", {
    ref: "UserModel", // Which model to create relation to?
    localField: "user", // Which local filed connects to that relation.
    foreignField: "_id", // Which foreign filed connects to tha relation.
    justOne: true // category field should be one object and not array.
});
CartScheme.virtual("items", {
    ref: "ItemModel", // Which model to create relation to?
    localField: "_id", // Which local filed connects to that relation.
    foreignField: "cart", // Which foreign filed connects to tha relation.
    justOne: true // category field should be one object and not array.
});
CartScheme.virtual("orders", {
    localField: "_id", // relation's local field
    ref: "OrderModel", // Model?
    foreignField: "cart" // relation's foreign field
});

// 3. Create Mongoose Model with scheme defined above
const CartModel = mongoose.model("CartModel", CartScheme, "carts");

// 4. Return Mongoose Model (module.exports)
module.exports = CartModel;