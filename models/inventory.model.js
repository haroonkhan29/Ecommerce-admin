module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define("inventory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    lastUpdated: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false
  });

  return Inventory;
};
