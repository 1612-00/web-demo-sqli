require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// Register
router.post("/register", (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const sqlCheckFound = `SELECT * FROM admin WHERE username = '${username}'`;
    const sqlRegister = `INSERT INTO admin SET firstName = '${firstName}', lastName = '${lastName}', username = '${username}', password = '${password}'`;

    db.query(sqlCheckFound, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.length)
        return res.status(400).json({ success: false, message: "Found user" });
      else {
        db.query(sqlRegister, (error, results) => {
          if (error) {
            return res
              .status(400)
              .json({ success: false, message: "error", error });
          }
          const accessToken = jwt.sign(
            { userId: results.insertId },
            process.env.ACCESS_TOKEN_SECRET
          );
          return res.status(200).json({
            success: true,
            message: "Created user successfully",
            accessToken,
          });
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const sqlCheckLogin = `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`;

    db.query(sqlCheckLogin, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.length) {
        const accessToken = jwt.sign(
          { userId: results[0].id },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res
          .status(200)
          .json({ success: true, message: "Login successfully", accessToken });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

// Check logged in
router.get("/", verifyToken, (req, res) => {
  try {
    const sqlCheckLoggedIn = `SELECT * FROM admin WHERE id = '${req.userId}'`;

    db.query(sqlCheckLoggedIn, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.length) {
        return res
          .status(200)
          .json({ success: true, message: "User has logged in", user: results[0] });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
    })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Invalid server error", error });
  }
});

module.exports = router;
