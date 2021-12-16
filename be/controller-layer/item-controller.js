const express = require("express");
const item_dal = require("../data-access-layer/item-dal");
const ItemModel = require("../models/item-model");
const log = require("../middleware/logger");
const router = express.Router();

// GET ALL
router.get("/all/:cartId", async (request, response) => {
    try {
        const cartId = request.params.cartId;
        const items = await item_dal.getAllItems(cartId);
        response.json(items);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const _id = request.params.id;
        const item = await item_dal.getOneItem(_id);
        if (!item) {
            response.status(404).send(`Item '${_id}' doesn't exist`);
            return;
        }
        response.json(item);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

router.post("", async (request, response) => {
    try {
        const itemModel = new ItemModel(request.body);
        const errorMessages = itemModel.validateSync();
        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }
        const newItem = await item_dal.addItem(itemModel);
        response.status(201).json(newItem);
    } catch(err) {
        console.log(err);
    }
});

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await item_dal.deleteItem(id);
        if (!result) {
            response.status(404).send(`Item with ID ${id} doesn't exist.`);
            return;
        }
        response.sendStatus(204);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

//DELETE ALL
router.delete("", async (request, response) => {
    try {
        const result = await item_dal.deleteAll();
        if (!result) {
            console.log("couldnt delete all items");
            return;
        }
        response.sendStatus(204);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET image
router.get("/images/:name", (request, response) => {
    try {
        const fileName = request.params.name;
        const filePath = item_dal.getItemImage(fileName);
        response.sendFile(filePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;