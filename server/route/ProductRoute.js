const router = require("express").Router();
const db = require("../db");

// constructor
const Product = function (product) {
  this.name = product.name;
  this.amount = product.amount;
  this.price = product.price;
  this.des = product.des;
  this.img = product.img;
};

// Create product
router.post("/", (req, res) => {
  const { name, amount, price, des, img } = req.body;

  try {
    const sqlCreateProduct = `INSERT INTO product SET name = '${name}', amount = '${amount}', price = '${price}', des = '${des}', img = '${img}'`;

    db.query(sqlCreateProduct, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      res.status(200).json({
        success: true,
        message: "Created product successfully",
        results,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Find product by name
router.get("/:name", (req, res) => {
  try {
    const sqlGetByName = `SELECT * FROM product WHERE name LIKE "%${req.params.name}%"`;

    db.query(sqlGetByName, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      res.status(200).json({
        success: true,
        message: "Find product successfully",
        results,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Get All
router.get("/", (req, res) => {
  try {
    const sqlGetByName = `SELECT * FROM product`;

    db.query(sqlGetByName, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      res.status(200).json({
        success: true,
        message: "Find product successfully",
        results,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Update by Id
router.post("/update/:productId", (req, res) => {
  const { name, amount, price, des, img } = req.body;

  try {
    const sqlUpdate = `UPDATE product SET name = '${name}', amount = '${amount}', price = '${price}', des = '${des}', img = '${img}' WHERE id = '${req.params.productId}'`;

    db.query(sqlUpdate, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.affectedRows == 0) {
        return res
          .status(400)
          .json({ success: false, message: "Not found Product with the id" });
      }

      res.status(200).json({
        success: true,
        message: "Updated product successfully",
        results,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Remove product by id
router.delete("/delete/:productId", (req, res) => {
  try {
    const sqlDelete = `DELETE FROM product WHERE id = '${req.params.productId}'`;

    db.query(sqlDelete, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.affectedRows == 0) {
        return res
          .status(400)
          .json({ success: false, message: "Not found Product with the id" });
      }

      res.status(200).json({
        success: true,
        message: "Delete product successfully",
        results,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
})

module.exports = router;
