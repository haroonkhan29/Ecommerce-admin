const db = require("../models");
const Inventory = db.Inventory;
const Product = db.Product;

exports.getInventory = async (req, res) => {
  try {
    // Return inventory with product details
    const inventory = await Inventory.findAll({
      include: [{ model: Product, as: "product" }],
      order: [["quantity", "ASC"]]
    });
    res.send(inventory);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getLowStockAlerts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10; // default low stock threshold
    const lowStock = await Inventory.findAll({
      where: { quantity: { [db.Sequelize.Op.lte]: threshold } },
      include: [{ model: Product, as: "product" }],
      order: [["quantity", "ASC"]]
    });
    res.send(lowStock);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).send({ message: "productId and quantity are required" });
    }

    const inventory = await Inventory.findOne({ where: { productId } });

    if (!inventory) {
      return res.status(404).send({ message: "Inventory not found for this product" });
    }

    inventory.quantity = quantity;
    inventory.lastUpdated = new Date();
    await inventory.save();

    res.send({ message: "Inventory updated", inventory });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
