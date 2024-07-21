const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error("Error is :", error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log(req.params);
  const id = req.params.id; // Access the value of the 'id' parameter
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id }); // Use _id to find the product by its ID
    // res.json(deletedProduct);
    res.send("deleted successfull");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getProductbyPage = asyncHandler(async (req, res) => {
  try {
    // Extract pagination parameters
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    const startIndex = (page - 1) * limit;

    // Prepare filter criteria based on query parameters
    let filter = {};

    // Example filters based on query parameters
    if (req.query.category) {
      filter.category = req.query.category;
    }
    // Add more filters as needed, e.g., price range, etc.

    // Fetch products based on filter criteria
    const products = await Product.find(filter)
      .skip(startIndex)
      .limit(limit)
      .exec();

    // Count total products matching the filter criteria
    const totalProducts = await Product.countDocuments(filter);

    // Prepare pagination metadata
    const pageCount = Math.ceil(totalProducts / limit);
    const results = {
      totalProducts,
      pageCount,
      currentPage: page,
    };

    // Pagination links
    if (startIndex + limit < totalProducts) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    // Response with results and products
    res.json({ products, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const search = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { season: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProducts,
  getProductbyPage,
  updateProduct,
  deleteProduct,
  search,
  addToWishlist,
};
