require("dotenv").config(); //dotenv npm package allows us to use this line of code to load any environment variables into index (process.env.____)
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8081;

const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

//If none of the routes are reached, run this function
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
