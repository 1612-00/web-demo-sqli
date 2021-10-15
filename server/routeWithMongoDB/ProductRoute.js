const router = require("express").Router();
const { Model } = require("mongoose");
const Product = require("../model/Product");
const verifyToken = require("../middleware/verifyToken");

// Create product
router.post("/", verifyToken, async (req, res) => {
  const { name, des, price, amount } = req.body;

  if (!name || !des || !price || !amount)
    return res
      .status(400)
      .json({ success: false, message: "Missing data input" });
  try {
    const product = new Product({
      name,
      des,
      price,
      amount,
    });

    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Add product successfully", product });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
});

// Get all product
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = Product.find({}, (err, results) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, products: results });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
});

// Get product by name
router.get("/getbyname/:name", verifyToken, (req, res) => {
  try {
    const Products = Product.find(
      { name: new RegExp(req.params.name, "i") },
      (err, results) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        } else {
          return res.status(200).json({ success: true, products: results });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
});

module.exports = router;
