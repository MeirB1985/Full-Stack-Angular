global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");

const express = require("express");
const cors = require("cors");
const product_controller = require("./controller-layer/product-controller");
const auth_controller = require("./controller-layer/auth-controller");
const category_controller = require("./controller-layer/category-controller");
const cart_controller = require("./controller-layer/cart-controller");
const item_controller = require("./controller-layer/item-controller");
const fileUpload = require("express-fileupload");
const verifyLoggedIn = require("./middleware/verify-logged-in");
const orders_controller = require("./controller-layer/orders-controller");
const users_controller = require("./controller-layer/users-controller");

// 1. Create REST API server
const server = express();
// server.use(cors({origin: "http://localhost:4200/"}));
server.use(cors());
server.use(fileUpload());

// 2. Configure REQUEST parser to use JSON (PARSER that automaticlaly parses JSON into JS objects)
server.use(express.json()); // REST API works with JSON 
// server.use(express.urlencoded({extended: true})); // HTML Form submit

server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});

server.use("/token/verify", verifyLoggedIn, (request, response) => {
});
server.use("/api/auth", auth_controller);
server.use("/api/admin", product_controller);
server.use("/api/products", product_controller);
server.use("/api/categories", category_controller);
server.use("/api/carts", cart_controller);
server.use("/api/items", item_controller);
server.use("/api/orders", orders_controller);
server.use("/api/users", users_controller);
server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

// 4. Open server for client requests using a specific port
server.listen(3030, () => console.log("Server is listening..."));
