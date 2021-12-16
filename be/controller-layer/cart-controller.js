const express = require("express");
const cart_dal = require("../data-access-layer/cart-dal");
const CartModel = require("../models/cart-model");
const log = require("../middleware/logger");
const router = express.Router();

// GET ALL of specific user
router.get("/all/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const carts = await cart_dal.getAllCarts(userId);
        response.json(carts);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const _id = request.params.id;
        const cart = await cart_dal.getOneCart(_id);
        if (!cart) {
            response.status(404).send(`ID '${_id}' doesn't exist`);
            return;
        }
        response.json(cart);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// POST
router.post("", async (request, response) => {
    try {
        const cartModel = new CartModel(request.body);
        const errorMessages = cartModel.validateSync(); // Exepcted validation errors
        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }
        const newCart = await cart_dal.addCart(cartModel);
        response.status(201).json(newCart);
    } catch(err) {
        console.log(err);
    }
});

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await cart_dal.deleteCart(id);
        if (!result) {
            response.status(404).send(`Cart with ID ${id} doesn't exist.`);
            return;
        }
        response.sendStatus(204); // Response status 204 with empty body.
    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;