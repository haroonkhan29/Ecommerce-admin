const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require("./product.model")(sequelize, Sequelize);
db.Sale = require("./sales.model")(sequelize, Sequelize);
db.Inventory = require("./inventory.model")(sequelize, Sequelize);

// Associations
db.Product.hasMany(db.Sale, { foreignKey: "productId", as: "sales" });
db.Sale.belongsTo(db.Product, { foreignKey: "productId", as: "product" });

db.Product.hasOne(db.Inventory, { foreignKey: "productId", as: "inventory" });
db.Inventory.belongsTo(db.Product, { foreignKey: "productId", as: "product" });

module.exports = db;
