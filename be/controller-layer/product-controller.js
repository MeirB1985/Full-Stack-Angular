const express = require("express");
const product_dal = require("../data-access-layer/product-dal");
const ProductModel = require("../models/product-model");
const log = require("../middleware/logger");
const router = express.Router();

// GET ALL
router.get("", async (request, response) => {
    try {
        const products = await product_dal.getAllProducts();
        response.json(products);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const _id = request.params.id;
        const product = await product_dal.getOneProduct(_id);
        if (!product) {
            response.status(404).send(`ID '${_id}' doesn't exist`);
            return;
        }
        response.json(product);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// POST
router.post("", async (request, response) => {
    try {
        const productModel = new ProductModel(request.body);
        const errorMessages = productModel.validateSync();

        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }

        const image = request.files && request.files.image ? request.files.image : null;

        if (!image) return response.status(400).send("Missing image.");

        const newProduct = await product_dal.addProduct(productModel, image);
        response.status(201).json(newProduct);
    } catch(err) {
        console.log(err);
    }
});

// PUT
router.put("/:id", log, async (request, response) => {
    try {
        const productId = request.params.id;
        const updatedProduct = new ProductModel(request.body);
        updatedProduct._id = productId;
        const errorMessages = updatedProduct.validateSync();

        if (errorMessages) return response.status(400).send(errorMessages);

        const image = request.files && request.files.image ? request.files.image : null;
        if (!image) return response.status(400).send("Missing image.");

        const result = await product_dal.editProduct(updatedProduct, image);
        if (result === null) {
            response.status(404).send(`Product with ID ${productId} doesn't exist.`);
            return;
        }

        response.json(result);

    } catch(err) {
        response.status(500).send(err.message);
    }
});

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await product_dal.deleteProduct(id);

        if (!result) {
            response.status(404).send(`Product with ID ${id} doesn't exist.`);
            return;
        }
        
        response.sendStatus(204);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3001/api/products/images/7.jpg
router.get("/images/:name", (request, response) => {
    try {
        const fileName = request.params.name;
        const filePath = product_dal.getProductImage(fileName);
        response.sendFile(filePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;