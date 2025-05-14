const db = require("../models");
const Sale = db.Sale;
const Product = db.Product;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, productId, category } = req.query;

    const where = {};
    if (startDate && endDate) {
      where.saleDate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    if (productId) {
      where.productId = productId;
    }

    // Include Product for filtering by category
    const includeProduct = {
      model: Product,
      as: "product",
      required: true
    };

    if (category) {
      includeProduct.where = { category };
    }

    const sales = await Sale.findAll({ where, include: [includeProduct] });
    res.send(sales);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Revenue analysis daily, weekly, monthly, yearly and comparison endpoint
exports.getRevenueAnalysis = async (req, res) => {
  try {
    const { period, startDate, endDate, category } = req.query;
    // period: daily, weekly, monthly, annual

    const groupBy = {
      daily: Sequelize.fn("DATE", Sequelize.col("saleDate")),
      weekly: Sequelize.fn("YEARWEEK", Sequelize.col("saleDate")),
      monthly: Sequelize.fn("DATE_FORMAT", Sequelize.col("saleDate"), "%Y-%m"),
      annual: Sequelize.fn("YEAR", Sequelize.col("saleDate")),
    };

    const groupKey = groupBy[period] || groupBy.daily;

    const where = {};
    if (startDate && endDate) {
      where.saleDate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const includeProduct = { model: Product, as: "product", required: true };
    if (category) {
      includeProduct.where = { category };
    }

    const revenueData = await Sale.findAll({
      attributes: [
        [groupKey, "period"],
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "totalRevenue"]
      ],
      where,
      include: [includeProduct],
      group: ["period"],
      order: [["period", "ASC"]],
      raw: true
    });

    res.send(revenueData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
