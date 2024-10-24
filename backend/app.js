const express = require("express");
const { PORT } = require("./key");
const mongoose = require("mongoose");
const baseRouter = require("./routes/index");

const app = express();

app.use(express.json());

app.use(express.static("../frontend/build"));
app.use("api/v1", baseRouter);

mongoose
  .connect("mongodb://localhost:27017/to-do-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is listning on ${PORT}`);
});
