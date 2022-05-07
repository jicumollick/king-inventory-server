const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("King Inventory Server is running");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
