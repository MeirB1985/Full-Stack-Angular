const express = require("express");
const category_dal = require("../data-access-layer/category-dal");
const CategoryModel = require("../models/category-model");
const log = require("../middleware/logger");
const router = express.Router();

// GET all categories http://localhost:3001/api/products/categories
router.get("", async (request, response) => {
    try {
        const categories = await category_dal.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET ONE
router.get("/:id", [log], async (request, response) => {
    try {
        const _id = request.params.id;
        const category = await category_dal.getOneCategory(_id);
        if (!category) {
            response.status(404).send(`ID '${_id}' doesn't exist`);
            return;
        }
        response.json(category);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// POST
    router.post("", async (request, response) => {
        try {
            const categoryModel = new CategoryModel(request.body);
            const errorMessages = categoryModel.validateSync();
            if (errorMessages) {
                response.status(400).send(errorMessages);
                return;
            }
            const newCategory = await category_dal.addCategory(categoryModel);
            response.status(201).json(newCategory);
        } catch(err) {
            console.log(err);
        }
    });

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await category_dal.deleteCategory(id);
        if (!result) {
            response.status(404).send(`Category with ID ${id} doesn't exist.`);
            return;
        }
        response.sendStatus(204);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;