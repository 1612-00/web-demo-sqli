require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const dbConfig = require("./db.config");
const connection = require("./db");

// const userRouter = require("./route/UserRoute");
// const productRouter = require("./route/ProductRoute");

const userRouter = require("./routeWithMongoDB/UserRoute");
const productRouter = require("./routeWithMongoDB/ProductRoute");

// Connect mongooDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.sosyb.mongodb.net/demosqli?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongooDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

// // Connect mysql DB
// connection.connect(function (err) {
//   err
//     ? console.log(err)
//     : console.log("DB connection on port " + dbConfig.PORT);
// });

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(4000, () => console.log("App listening on port 4000"));
