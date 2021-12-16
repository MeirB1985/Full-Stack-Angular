const express = require("express");
const order_dal = require("../data-access-layer/order-dal");
const OrderModel = require("../models/order-model");
const log = require("../middleware/logger");
const fileHandler = require('../file-handler.js');
const router = express.Router();

// GET ALL
router.get("", async (request, response) => {
    try {
        const orders = await order_dal.getAllOrders();
        response.json(orders);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ALL of specific user
router.get("/all/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const orders = await order_dal.getAllUserOrders(userId);
        response.json(orders);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ALL booked dates
router.get("/bookeddates", async (request, response) => {
    try {
        const bookedDates = await order_dal.getAllBookedDates();
        response.json(bookedDates);
    } catch(err) {
        response.status(500).send(err.message);
    }
})

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const _id = request.params.id;
        const order = await order_dal.getOneOrder(_id);
        if (!order) {
            response.status(404).send(`ID '${_id}' doesn't exist`);
            return;
        }
        response.json(order);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// POST
router.post("", async (request, response) => {
    try {
        const orderModel = new OrderModel(request.body);
        const errorMessages = orderModel.validateSync();
        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }
        const newOrder = await order_dal.addOrder(orderModel);
        await fileHandler.writeFile(`./database/orders/${newOrder._id}.txt`, `Order ID:\n${newOrder._id} \r Order UserID:\n${newOrder.user} \r Order CartID:\n${newOrder.cart} \r Order price:\n${newOrder.price} \r Order user city:\n${newOrder.city} \r Order user st:\n${newOrder.st} \r Order shipping date:\n${newOrder.shippingDate} \r Order date:\n${newOrder.orderDate} \r Order card number:\n${newOrder.card}`);
        response.status(201).json(newOrder);
    } catch(err) {
        console.log(err);
    }
});

// GET receipt
router.get("/database/orders/:name", (request, response) => {
    try {
        const orderId = request.params.name;
        const filePath = order_dal.getOrderReceipt(orderId);
        response.sendFile(filePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;