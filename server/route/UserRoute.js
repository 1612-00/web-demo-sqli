const express = require("express");
const router = express.Router();
const db = require("../db");

// Register
router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const sqlCheckFound = `SELECT * FROM user WHERE email = '${email}'`;
    const sqlRegister = `INSERT INTO user SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', password = '${password}'`;

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
          return res
            .status(200)
            .json({ success: true, message: "Created user successfully" });
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
router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sqlCheckLogin = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;

    db.query(sqlCheckLogin, (error, results) => {
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: "error", error });
      }

      if (results.length)
        return res
          .status(200)
          .json({ success: true, message: "Login successfully" });
      else {
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

module.exports = router;
