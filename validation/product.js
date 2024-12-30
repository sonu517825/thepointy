// logger
const Logger = require("../log/logger");
const log = new Logger("product-validations");
log.info("all product validations...");

const Util = require("../util/util");

// create product validation
const createProductValidation = function (body) {
  const validation = {
    success: true,
    errorList: [],
  };

  try {
    // Validate name and description as strings
    ["name", "description"].forEach((e) => {
      if (!Util.isOwnPropertyExist(body, e) || !Util.isString(body[e])) {
        Util.addValidationError(
          validation,
          e,
          `Please provide ${e} as a string`
        );
      }
    });

    // Validate price
    if (
      !Util.isOwnPropertyExist(body, "price") ||
      typeof body.price !== "number" ||
      body.price < 0
    ) {
      Util.addValidationError(
        validation,
        "price",
        "Please provide a valid price. It must be a non-negative number."
      );
    }

    // Validate stock
    if (
      !Util.isOwnPropertyExist(body, "stock") ||
      typeof body.stock !== "number" ||
      body.stock < 0
    ) {
      Util.addValidationError(
        validation,
        "stock",
        "Please provide a valid stock quantity. It cannot be negative."
      );
    }
  } catch (error) {
    log.error(`Error in create product validation: ${error}`);
    Util.addValidationError(validation, "unknown", "Something went wrong");
  }

  return validation;
};

// get all validation
const allProduct = function (query) {
  const validation = {
    success: true,
    errorList: [],
  };

  try {
    // Validate page
    if (query.page) {
      query.page = parseInt(query.page, 10);
      if (!Util.isNumber(query.page) || query.page <= 0) {
        Util.addValidationError(
          validation,
          "page",
          "Please provide a valid page. It must be a positive integer."
        );
      }
    }

    // Validate limit
    if (query.limit) {
      query.limit = parseInt(query.limit, 10);
      if (!Util.isNumber(query.limit) || query.limit <= 0) {
        Util.addValidationError(
          validation,
          "limit",
          "Please provide a valid limit. It must be a positive integer."
        );
      }
    }

    // Validate skip
    if (query.skip) {
      query.skip = parseInt(query.skip, 10);
      if (!Util.isNumber(query.skip) || query.skip < 0) {
        Util.addValidationError(
          validation,
          "skip",
          "Please provide a valid skip. It must be a non-negative integer."
        );
      }
    }

    // Validate search
    if (query.search && !Util.isString(query.search)) {
      Util.addValidationError(
        validation,
        "search",
        "Please provide a valid search string."
      );
    }

    // Validate minPrice
    if (query.minPrice !== undefined) {
      query.minPrice = parseFloat(query.minPrice);
      if (!Util.isNumber(query.minPrice) || query.minPrice < 0) {
        Util.addValidationError(
          validation,
          "minPrice",
          "Please provide a valid minPrice. It must be a non-negative number."
        );
      }
    }

    // Validate maxPrice
    if (query.maxPrice !== undefined) {
      query.maxPrice = parseFloat(query.maxPrice);
      if (!Util.isNumber(query.maxPrice) || query.maxPrice < 0) {
        Util.addValidationError(
          validation,
          "maxPrice",
          "Please provide a valid maxPrice. It must be a non-negative number."
        );
      }
    }

    // Validate minPrice and maxPrice range
    if (
      query.minPrice !== undefined &&
      query.maxPrice !== undefined &&
      query.minPrice > query.maxPrice
    ) {
      Util.addValidationError(
        validation,
        "priceRange",
        "minPrice cannot be greater than maxPrice."
      );
    }

    // Validate minStock
    if (query.minStock !== undefined) {
      query.minStock = parseInt(query.minStock, 10);
      if (!Util.isNumber(query.minStock) || query.minStock < 0) {
        Util.addValidationError(
          validation,
          "minStock",
          "Please provide a valid minStock. It must be a non-negative integer."
        );
      }
    }

    // Validate availability
    if (query.availability !== undefined) {
      if (query.availability === "true" || query.availability === "false") {
        query.availability = query.availability === "true";
      } else if (typeof query.availability !== "boolean") {
        Util.addValidationError(
          validation,
          "availability",
          "Please provide a valid availability. It must be a boolean (true/false)."
        );
      }
    }
  } catch (error) {
    log.error(`Error in getAll validation: ${error}`);
    Util.addValidationError(validation, "unknown", "Something went wrong");
  }

  return validation;
};

// update product validation
const updateProductValidation = function (body) {
  const validation = {
    success: true,
    errorList: [],
  };

  try {
    // Validate name and description as strings
    ["name", "description"].forEach((e) => {
      if (body[e] && !Util.isString(body[e])) {
        Util.addValidationError(
          validation,
          e,
          `If provided, ${e} must be a string`
        );
      }
    });

    // Validate price
    if (body.price !== undefined) {
      if (typeof body.price !== "number" || body.price < 0) {
        Util.addValidationError(
          validation,
          "price",
          "Please provide a valid price. It must be a non-negative number."
        );
      }
    }

    // Validate stock
    if (body.stock !== undefined) {
      if (typeof body.stock !== "number" || body.stock < 0) {
        Util.addValidationError(
          validation,
          "stock",
          "Please provide a valid stock quantity. It cannot be negative."
        );
      }
    }
  } catch (error) {
    log.error(`Error in update product validation: ${error}`);
    Util.addValidationError(validation, "unknown", "Something went wrong");
  }

  return validation;
};

module.exports = {
  createProductValidation,
  allProduct,
  updateProductValidation,
};
