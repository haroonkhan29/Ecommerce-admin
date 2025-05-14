const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sync DB and create tables
db.sequelize.sync().then(() => {
  console.log("Database synchronized");
});

// Routes
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/sales", require("./routes/sales.routes"));
app.use("/api/inventory", require("./routes/inventory.routes"));

// Home route
app.get("/", (req, res) => {
  res.send("E-commerce Admin API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
