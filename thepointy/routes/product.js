// logger
const Logger = require("../log/logger");
const log = new Logger("product-route");
log.info("all product routes...");

const productController = require("../controller/product");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// create product - POST /api/product/create
router.post("/create", auth, productController.createProduct);

// update product - PUT /api/product/update/{id}
router.put("/update/:id", auth, productController.updateProduct);

// all product - GET /api/product/all
router.get("/all", auth, productController.allProduct);

// delete product - DELETE /api/product/delete/{id}
router.delete("/delete/:id", auth, productController.deleteProduct);

module.exports = router;
