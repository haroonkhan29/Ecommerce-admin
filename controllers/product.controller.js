const db = require("../models");
const Product = db.Product;
const Inventory = db.Inventory;

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || quantity === undefined) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const product = await Product.create({ name, category, price });

    await Inventory.create({ productId: product.id, quantity, lastUpdated: new Date() });

    res.status(201).send({ product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Inventory, as: "inventory" }]
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
