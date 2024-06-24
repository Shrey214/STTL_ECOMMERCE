const Product = require("../models/Product.js");
// import { rm } from "fs";
// import { faker } from "@faker-js/faker";
const { uploadImageToCloudinary } = require("../utils/imageUploader.js");

exports.getlatestProducts = async (req, res, next) => {
  try {
    let products;
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  // console.log("Inside Single");
  try {
    let product;
    const {id} = req.params;

    product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.newProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category, accountType } = req.body;
    const productPhoto = req.files.productImage;
    console.log(name, price, stock, category, accountType, productPhoto);

    if (
      !name ||
      !price ||
      !stock ||
      !category ||
      !productPhoto ||
      !accountType
    ) {
      return res.status(500).json({
        success: false,
        message: "all fields are mandatory",
      });
    }

    // Upload the Thumbnail to Cloudinary
    const productImage = await uploadImageToCloudinary(
      productPhoto,
      process.env.FOLDER_NAME
    );

    console.log("Cloudinary", productImage.secure_url);
    const newProduct = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: String(productImage.secure_url),
    });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return res.status(404).json({message:"Product Not Found",success:false});

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(500).json({
      success: false,
      message: 'Product not found',
    });;

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  const { search, sort, category, price } = req.query;

  const page = Number(req.query.page) || 1;
  // 1,2,3,4,5,6,7,8
  // 9,10,11,12,13,14,15,16
  // 17,18,19,20,21,22,23,24
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (search)
    baseQuery.name = {
      $regex: search,
      $options: "i",
    };

  if (price)
    baseQuery.price = {
      $lte: Number(price),
    };

  if (category) baseQuery.category = category;

  const productsPromise = Product.find(baseQuery)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);

  const [products, filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQuery),
  ]);

  const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

  return res.status(200).json({
    success: true,
    products,
    totalPage,
  });
};
