const router = require("express").Router();
const { Model } = require("mongoose");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

// register
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (!username || !firstName || !lastName || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing name, username or password" });

  try {
    // Check for existing username
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already taken" });

    // All good
    const newUser = new User({
      firstName,
      lastName,
      username,
      password,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
});

// login
router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  console.log(username + password);

  try {
    username = JSON.parse(username);
  } catch (e) {}
  try {
    password = JSON.parse(password);
  } catch (e) {}

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username" });

    // Check for existing username
    // const user = await User.findOne({ username });

    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Incorrect username" });

    // if (user.password !== password)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Incorrect password" });

    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
});

// Check logged in
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
