// logger
const Logger = require("../log/logger");
const log = new Logger("product-controller");
log.info("all product controller...");

const Validation = require("../validation/product");
const productModel = require("../model/product");

// create product controller
const createProduct = async function (req, res) {
  try {
    const body = req.body;
    const validations = Validation.createProductValidation(body);
    if (!validations.success) {
      log.error("Invalid create product request...");
      return res.status(400).json(validations);
    }
    const create = await productModel.createProduct(body);
    if (!create.success) {
      log.error("Invalid create product request...");
      return res.status(create.statusCode || 500).json(create);
    }
    return res.status(201).json(create);
  } catch (error) {
    log.error(`Error in create product request: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

// update product controller
const updateProduct = async function (req, res) {
  try {
    const body = req.body;
    const { id } = req.params;

    const validations = Validation.updateProductValidation(body);
    if (!validations.success) {
      log.error("Invalid update product request...");
      return res.status(400).json(validations);
    }
    const update = await productModel.updateProduct(body, id);
    if (!update.success) {
      log.error("Invalid update product request...");
      return res.status(update.statusCode || 500).json(update);
    }
    return res.status(200).json(update);
  } catch (error) {
    log.error(`Error in create product request: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

// all product controller
const allProduct = async function (req, res) {
  try {
    const query = req.query;

    // validation
    const validations = Validation.allProduct(query);
    if (!validations.success) {
      log.error("Invalid all product request...");
      return res.status(400).json(validations);
    }

    // remove all null undefined empty keys
    const _query = Object.entries(query).reduce((a, [key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        a[key] = value;
      }
      return a;
    }, {});

    // Retrieve all products from the database
    const products = await productModel.allProduct(_query);

    if (!products.success) {
      log.error("Invalid get product request...");
      return res.status(products.statusCode || 500).json(products);
    }
    return res.status(200).json(products);
  } catch (error) {
    log.error(`Error in fetching all products: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

// delete product controller
const deleteProduct = async function (req, res) {
  try {
    const { id } = req.params;

    const products = await productModel.deleteProduct(id);

    if (!products.success) {
      log.error("Invalid delete product request...");
      return res.status(products.statusCode || 500).json(products);
    }
    return res.status(200).json(products);
  } catch (error) {
    log.error(`Error in delete product: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  allProduct,
  deleteProduct,
};
