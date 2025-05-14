module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("sale", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    saleDate: { type: DataTypes.DATE, allowNull: false }
  }, {
    timestamps: true,
    indexes: [{ fields: ['saleDate'] }]
  });

  return Sale;
};
