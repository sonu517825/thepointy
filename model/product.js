// logger
const Logger = require("../log/logger");
const log = new Logger("product-controller");
log.info("all product model...");

const productSchema = require("../schema/product");
const Service = require("../services/service");

// create product model
const createProduct = async function (body) {
  const resp = {
    success: true,
  };
  try {
    const product = await productSchema.create(body);
    resp.message = "Product created successfully";
    resp.data = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  } catch (error) {
    log.error(`Error in product create model: ${error}`);
    resp.success = false;
    resp.error = "Something went wrong";
  }
  return resp;
};

// update product model
const updateProduct = async function (body, id) {
  const resp = {
    success: true,
  };

  try {
    const product = await productSchema.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );

    if (!product) {
      resp.success = false;
      resp.error = "Product not found.";
      resp.statusCode = 404;
      return resp;
    }

    resp.message = "Product updated successfully";
    resp.data = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  } catch (error) {
    log.error(`Error in product update model: ${error}`);
    resp.success = false;
    resp.error = "Something went wrong";
    resp.statusCode = 500;
  }

  return resp;
};

// get product model
const allProduct = async function (query) {
  let resp = {
    success: true,
  };

  try {
    // Destructure query parameters with default values
    let { page = 1, limit = 10, skip = 0 } = query;

    // filter based on validated query parameters
    const filter = Service.createFilter(query);

    // pagination
    skip = skip || (page - 1) * limit;

    // Adjust limit and skip to be numbers
    limit = parseInt(limit, 10);
    skip = parseInt(skip, 10);

    // Fetch products
    const data = await productSchema
      .find(filter)
      .skip(skip)
      .limit(limit)
      .select({ __v: 0 })
      .exec();

    // Handle case when no products are found
    if (data.length === 0) {
      log.error("No products found with the given criteria.");
      resp.success = false;
      resp.error = "No products found.";
      resp.statusCode = 404;
      return resp;
    }

    // total count
    const total = await productSchema.countDocuments(filter);

    // response
    resp = { ...resp, ...query };
    resp.page = page;
    resp.skip = skip;
    resp.limit = limit;
    resp.total = total;
    resp.data = data;
    resp.message = "Products fetched successfully.";
  } catch (error) {
    log.error(`Error in all product model: ${error.message}`);
    resp.success = false;
    resp.error = "Something went wrong while fetching products.";
    resp.statusCode = 500;
  }

  return resp;
};

// delete product model
const deleteProduct = async function (id) {
  const resp = {
    success: true,
  };
  try {
    const product = await productSchema.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      {
        new: true,
      }
    );
    resp.message = "Product deleted successfully";
    resp.data = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      isDeleted: product.isDeleted,
    };
  } catch (error) {
    log.error(`Error in product delete model: ${error}`);
    resp.success = false;
    resp.error = "Something went wrong";
  }
  return resp;
};

module.exports = {
  createProduct,
  updateProduct,
  allProduct,
  deleteProduct,
};
