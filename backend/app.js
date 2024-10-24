const express = require("express");
const PORT = 8000;

const app = express();

app.use(express.json());

app.use(express.static("../frontend/build"));

app.listen(PORT, () => {
  console.log(`Server is listning on ${PORT}`);
});
