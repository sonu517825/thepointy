const createFilter = (query) => {
  const filter = {
    isDeleted: false,
  };

  // Search filter
  if (query.search) {
    const searchQuery = query.search.trim();
    filter.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ];
  }

  // Price range filter
  if (query.minPrice !== undefined && query.maxPrice !== undefined) {
    filter.price = {
      $gte: query.minPrice,
      $lte: query.maxPrice,
    };
  } else if (query.minPrice !== undefined) {
    filter.price = { $gte: query.minPrice };
  } else if (query.maxPrice !== undefined) {
    filter.price = { $lte: query.maxPrice };
  }

  // Min stock filter
  if (query.minStock !== undefined) {
    filter.stock = { $gte: query.minStock };
  }

  return filter;
};

module.exports = { createFilter };
