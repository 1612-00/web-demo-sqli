const express = require("express");
const cors = require('cors')
const app = express();

const dbConfig = require("./db.config");
const connection = require("./db");

const userRouter = require("./route/UserRoute");
const productRouter = require("./route/ProductRoute");

connection.connect(function (err) {
  err
    ? console.log(err)
    : console.log("DB connection on port " + dbConfig.PORT);
});

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(4000, () => console.log("App listening on port 4000"));
